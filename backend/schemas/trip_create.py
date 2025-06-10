from datetime import date, time
from pydantic import BaseModel
from enum import Enum

class TripStatusEnum(str, Enum):
    upcoming = 'Upcoming'
    in_progress = 'In progress'
    finished = 'Finished'

class TripCreate(BaseModel):
    start: str
    dest: str
    date: date
    time: time
    trip_status: TripStatusEnum
    user_id: int

    class Config:
    # Optional: Configure Pydantic to allow Enum values as strings
        use_enum_values = True
    

