select
  events.id,
  events.event_start_timestamp,
  events.source_app,
  events.event_type,
  round(st_x(events.geom)::numeric, 4) as x,
  round(st_y(events.geom)::numeric, 4) as y,
  jsonb_agg(
    to_jsonb(e) - 'e.event_id'
  ) as encounters
from events
  left join (
    select
      encounters.event_id,
      encounters.id,
      species.common_name,
      species.species_name,
      species.species_group,
      animals.ind_id,
      encounters.life_status,
      encounters.age_class,
      encounters.sex,
      encounters.n
    from encounters
      left join animals on encounters.animal_id = animals.id
      left join species on encounters.species_id = species.id
  ) as e on events.id = e.event_id
group by events.id
$/pagination:raw/