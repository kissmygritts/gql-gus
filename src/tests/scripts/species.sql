select json_agg(d)
from (
  select
    *
  from species
  where species_group = 'ungulate'
  limit 3
) as d \g '/Users/mitchellgritts/documents/projects/gus/api/src/tests/species-fixture.json'