select
  lab_results.id,
  encounters.id as encounter_id,
  labids.labid as lab_id,
  lab_results.case_num,
  lab_results.specnum,
  lab_results.specimenid,
  lab_results.specimen_location,
  lab_results.test,
  lab_results.result,
  lab_results.lvl,
  lab_results.isolate,
  lab_results.lab
from encounters
  join labids on encounters.id = labids.encounter_id
  join lab_results on labids.id = lab_results.lab_id
where encounters.id in ($/ids:csv/)
order by encounters.id, lab_results.test