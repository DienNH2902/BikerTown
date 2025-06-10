from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Todo(Base):
    __tablename__ = "todo"
    item_id = Column(Integer, primary_key = True, index = True)
    stop_id = Column(Integer, ForeignKey('stops.stop_id'))
    item_name = Column(String)
    item_status = Column(Boolean)
    item_order = Column(Integer)

    # Relationship to a Stop (if you want to link todos to specific stops)
    stop = relationship('Stop', back_populates='todos')
    
