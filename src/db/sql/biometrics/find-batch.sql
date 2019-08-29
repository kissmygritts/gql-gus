select
  *
from biometrics
where encounter_id in ($/ids:csv/)