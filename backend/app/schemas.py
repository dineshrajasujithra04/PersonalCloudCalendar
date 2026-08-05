from pydantic import BaseModel
from datetime import date, time


class EventCreate(BaseModel):
    title: str
    description: str
    event_date: date
    event_time: time


class Event(EventCreate):
    id: int

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str