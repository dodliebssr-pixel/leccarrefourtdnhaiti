create table if not exists public.analytics_sessions (
  session_id uuid primary key,
  visitor_id uuid not null,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  landing_path text not null default '/',
  referrer_host text,
  device_type text not null default 'unknown'
    check (device_type in ('mobile', 'desktop', 'tablet', 'unknown')),
  browser text not null default 'Unknown',
  operating_system text not null default 'Unknown',
  country text,
  city text,
  traffic_source text not null default 'direct'
    check (traffic_source in ('google', 'facebook', 'whatsapp', 'tiktok', 'instagram', 'direct', 'other')),
  constraint analytics_sessions_path_length check (char_length(landing_path) <= 512),
  constraint analytics_sessions_referrer_length check (referrer_host is null or char_length(referrer_host) <= 255),
  constraint analytics_sessions_country_code check (country is null or country ~ '^[A-Z]{2}$'),
  constraint analytics_sessions_browser_length check (char_length(browser) <= 80),
  constraint analytics_sessions_os_length check (char_length(operating_system) <= 80)
);

create table if not exists public.analytics_page_views (
  id bigint generated always as identity primary key,
  session_id uuid not null references public.analytics_sessions(session_id) on delete cascade,
  path text not null,
  viewed_at timestamptz not null default now(),
  constraint analytics_page_views_path_length check (char_length(path) <= 512)
);

create index if not exists analytics_sessions_started_at_idx
  on public.analytics_sessions (started_at desc);
create index if not exists analytics_sessions_last_seen_at_idx
  on public.analytics_sessions (last_seen_at desc);
create index if not exists analytics_sessions_visitor_started_idx
  on public.analytics_sessions (visitor_id, started_at);
create index if not exists analytics_sessions_country_idx
  on public.analytics_sessions (country) where country is not null;
create index if not exists analytics_page_views_viewed_at_idx
  on public.analytics_page_views (viewed_at desc);
create index if not exists analytics_page_views_path_viewed_idx
  on public.analytics_page_views (path, viewed_at desc);
create index if not exists analytics_page_views_session_idx
  on public.analytics_page_views (session_id, viewed_at desc);

alter table public.analytics_sessions enable row level security;
alter table public.analytics_page_views enable row level security;

revoke all on public.analytics_sessions, public.analytics_page_views from anon, authenticated;
grant select, insert, update, delete on public.analytics_sessions, public.analytics_page_views to service_role;

create or replace function public.track_analytics_event(
  p_event text,
  p_visitor_id uuid,
  p_session_id uuid,
  p_path text,
  p_referrer_host text,
  p_device_type text,
  p_browser text,
  p_operating_system text,
  p_traffic_source text,
  p_country text default null,
  p_city text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  safe_path text := case when left(coalesce(p_path, ''), 1) = '/' then left(p_path, 512) else '/' end;
begin
  if p_event is null or p_event not in ('pageview', 'heartbeat')
    or p_visitor_id is null
    or p_session_id is null
    or p_path is null
    or char_length(p_path) > 2048 then
    return;
  end if;

  insert into public.analytics_sessions (
    session_id,
    visitor_id,
    landing_path,
    referrer_host,
    device_type,
    browser,
    operating_system,
    traffic_source,
    country,
    city
  ) values (
    p_session_id,
    p_visitor_id,
    safe_path,
    left(nullif(p_referrer_host, ''), 255),
    case when p_device_type in ('mobile', 'desktop', 'tablet') then p_device_type else 'unknown' end,
    left(coalesce(nullif(p_browser, ''), 'Unknown'), 80),
    left(coalesce(nullif(p_operating_system, ''), 'Unknown'), 80),
    case when p_traffic_source in ('google', 'facebook', 'whatsapp', 'tiktok', 'instagram', 'direct', 'other')
      then p_traffic_source else 'other' end,
    case when upper(p_country) ~ '^[A-Z]{2}$' then upper(p_country) else null end,
    left(nullif(p_city, ''), 80)
  )
  on conflict (session_id) do update
    set last_seen_at = now(),
        country = coalesce(public.analytics_sessions.country, excluded.country),
        city = coalesce(public.analytics_sessions.city, excluded.city)
    where public.analytics_sessions.visitor_id = excluded.visitor_id;

  if p_event = 'pageview' and exists (
    select 1
    from public.analytics_sessions s
    where s.session_id = p_session_id
      and s.visitor_id = p_visitor_id
      and s.last_seen_at >= now() - interval '10 minutes'
  ) then
    insert into public.analytics_page_views (session_id, path)
    values (p_session_id, safe_path);
  end if;
end;
$$;

revoke all on function public.track_analytics_event(text, uuid, uuid, text, text, text, text, text, text, text, text) from public;
grant execute on function public.track_analytics_event(text, uuid, uuid, text, text, text, text, text, text, text, text) to anon, authenticated;

create or replace function public.get_admin_site_stats(p_from timestamptz, p_to timestamptz)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  result jsonb;
begin
  if p_from is null or p_to is null or p_to <= p_from or p_to - p_from > interval '366 days' then
    raise exception 'Invalid analytics date range';
  end if;

  with selected_sessions as (
    select s.*
    from public.analytics_sessions s
    where s.started_at >= p_from and s.started_at < p_to
  ),
  selected_views as (
    select v.path, v.viewed_at
    from public.analytics_page_views v
    where v.viewed_at >= p_from and v.viewed_at < p_to
  ),
  first_sessions as (
    select s.visitor_id, min(s.started_at) as first_seen_at
    from public.analytics_sessions s
    group by s.visitor_id
  ),
  daily as (
    select d.day::date as day,
      (select count(distinct s.visitor_id) from selected_sessions s
        where s.started_at >= (d.day::timestamp at time zone 'America/Port-au-Prince')
          and s.started_at < ((d.day + interval '1 day')::timestamp at time zone 'America/Port-au-Prince')) as visitors,
      (select count(*) from selected_views v
        where v.viewed_at >= (d.day::timestamp at time zone 'America/Port-au-Prince')
          and v.viewed_at < ((d.day + interval '1 day')::timestamp at time zone 'America/Port-au-Prince')) as page_views
    from generate_series(
      date_trunc('day', p_from at time zone 'America/Port-au-Prince'),
      date_trunc('day', (p_to - interval '1 microsecond') at time zone 'America/Port-au-Prince'),
      interval '1 day'
    ) as d(day)
  ),
  summary as (
    select
      (select count(distinct s.visitor_id) from selected_sessions s) as visitors,
      (select count(*) from selected_views) as page_views,
      (select count(distinct s.visitor_id) from public.analytics_sessions s where s.last_seen_at >= now() - interval '5 minutes') as active_visitors,
      coalesce((select round(avg(greatest(0, extract(epoch from (s.last_seen_at - s.started_at)))))::integer from selected_sessions s), 0) as average_duration_seconds,
      (select count(distinct s.visitor_id) from selected_sessions s join first_sessions f using (visitor_id) where f.first_seen_at >= p_from) as new_visitors,
      (select count(distinct s.visitor_id) from selected_sessions s join first_sessions f using (visitor_id) where f.first_seen_at < p_from) as returning_visitors
  )
  select jsonb_build_object(
    'summary', (select to_jsonb(summary) from summary),
    'daily', coalesce((select jsonb_agg(jsonb_build_object('date', day, 'visitors', visitors, 'pageViews', page_views) order by day) from daily), '[]'::jsonb),
    'pages', coalesce((select jsonb_agg(jsonb_build_object('label', path, 'count', views) order by views desc) from (select path, count(*) as views from selected_views group by path order by views desc limit 10) p), '[]'::jsonb),
    'countries', coalesce((select jsonb_agg(jsonb_build_object('label', country, 'count', visitors) order by visitors desc) from (select country, count(distinct visitor_id) as visitors from selected_sessions where country is not null group by country order by visitors desc limit 10) c), '[]'::jsonb),
    'cities', coalesce((select jsonb_agg(jsonb_build_object('label', city, 'count', visitors) order by visitors desc) from (select city, count(distinct visitor_id) as visitors from selected_sessions where city is not null group by city order by visitors desc limit 10) c), '[]'::jsonb),
    'devices', coalesce((select jsonb_agg(jsonb_build_object('label', device_type, 'count', visitors) order by visitors desc) from (select device_type, count(distinct visitor_id) as visitors from selected_sessions group by device_type order by visitors desc) d), '[]'::jsonb),
    'browsers', coalesce((select jsonb_agg(jsonb_build_object('label', browser, 'count', visitors) order by visitors desc) from (select browser, count(distinct visitor_id) as visitors from selected_sessions group by browser order by visitors desc limit 10) b), '[]'::jsonb),
    'operatingSystems', coalesce((select jsonb_agg(jsonb_build_object('label', operating_system, 'count', visitors) order by visitors desc) from (select operating_system, count(distinct visitor_id) as visitors from selected_sessions group by operating_system order by visitors desc limit 10) o), '[]'::jsonb),
    'sources', coalesce((select jsonb_agg(jsonb_build_object('label', traffic_source, 'count', visitors) order by visitors desc) from (select traffic_source, count(distinct visitor_id) as visitors from selected_sessions group by traffic_source order by visitors desc) t), '[]'::jsonb)
  ) into result;

  return result;
end;
$$;

revoke all on function public.get_admin_site_stats(timestamptz, timestamptz) from public, anon, authenticated;
grant execute on function public.get_admin_site_stats(timestamptz, timestamptz) to service_role;