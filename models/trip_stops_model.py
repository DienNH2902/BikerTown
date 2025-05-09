from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class TripStops(Base):
    __tablename__ = "tripstops"
    stop_id = Column(Integer, ForeignKey('stops.stop_id'), primary_key = True)
    trip_id = Column(Integer, ForeignKey('trips.trip_id'), primary_key = True)
    stop_order = Column(Integer)

    # Relationships
    trip = relationship('Trip', back_populates='stops')  # Link to the Trip model
    stop = relationship('Stop', back_populates='trips')  # Link to the Stop model
    
