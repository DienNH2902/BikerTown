from sqlalchemy import Column, Date, ForeignKey, Integer, String, Time, Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from enum import Enum
from database import Base

class TripStatusEnum(Enum):
    upcoming = 'Upcoming'
    in_progress = 'In progress'
    finished = 'Finished'

class Trip(Base):
    __tablename__ = "trips"
    trip_id = Column(Integer, primary_key = True, index = True)
    start = Column(String)
    destination = Column(String)
    date = Column(Date)
    time = Column(Time)
    trip_status = Column(SQLAlchemyEnum(TripStatusEnum))
    user_id = Column(Integer, ForeignKey('user.user_id'))

    user = relationship('User', back_populates='trips')
    stops = relationship('TripStops', back_populates='trip')
    
