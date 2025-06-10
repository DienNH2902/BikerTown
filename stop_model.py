from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Stop(Base):
    __tablename__ = "stops"
    stop_id = Column(Integer, primary_key = True, index = True)
    stop_name = Column(String)
    
    trips = relationship('TripStops', back_populates='stop')
    todos = relationship('Todo', back_populates='stop')
    
