-- \t
-- \a

select json_agg(d)
from (select
  id,
  ind_id
from animals
where id in (
  '407b3e0c-de12-4f40-a902-cb401ba4b44e', '83676cc6-bef9-4b99-874d-9cbd42bf23fb', 
  'a1f8cb3a-8901-4644-a19c-4ed68ff3fdc8', '32c5d988-73f3-459e-be23-3c42b827dd8b', '93705489-394f-41f9-afaa-74f59d24408c')) as d
\g '/Users/mitchellgritts/documents/projects/gus/api/src/tests/animal-fixture.json'

select json_agg(d)
from (select
  id,
  event_id,
  animal_id,
  species_id,
  life_status,
  age_class,
  sex,
  n,
  reencounter,
  relocation
from encounters
where animal_id in (
  '407b3e0c-de12-4f40-a902-cb401ba4b44e', '83676cc6-bef9-4b99-874d-9cbd42bf23fb', 
  'a1f8cb3a-8901-4644-a19c-4ed68ff3fdc8', '32c5d988-73f3-459e-be23-3c42b827dd8b',
  '93705489-394f-41f9-afaa-74f59d24408c'
)) as d
\g '/Users/mitchellgritts/documents/projects/gus/api/src/tests/encounter-fixture.json'
-- change species id to match species-fixture

select json_agg(d)
from (
  select id, x, y, datum
  from events
  where id in (
    select encounters.event_id
    from encounters 
    where animal_id in (
      '407b3e0c-de12-4f40-a902-cb401ba4b44e', '83676cc6-bef9-4b99-874d-9cbd42bf23fb', 
      'a1f8cb3a-8901-4644-a19c-4ed68ff3fdc8', '32c5d988-73f3-459e-be23-3c42b827dd8b',
      '93705489-394f-41f9-afaa-74f59d24408c'
    )
  )
) as d
\g '/Users/mitchellgritts/documents/projects/gus/api/src/tests/event-fixture.json'