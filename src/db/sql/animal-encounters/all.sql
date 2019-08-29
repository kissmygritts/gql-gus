select
  encounters.id as id,
  animals.id as animal_id,
  species.id as species_id,
  species.common_name,
  species.species_name,
  animals.ind_id,
  encounters.life_status,
  encounters.age_class,
  encounters.sex,
  encounters.n,
  encounters.reencounter,
  encounters.relocation
from animals
  right join encounters on animals.id = encounters.animal_id
  left join species on encounters.species_id = species.id
$/where:raw/
$/pagination:raw/