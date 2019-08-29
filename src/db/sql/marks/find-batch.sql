select
  *
from marks
where animal_id in ($/ids:csv/)
