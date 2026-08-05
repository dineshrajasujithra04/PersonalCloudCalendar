from sqlalchemy.orm import Session
from app import models, schemas
from app.security import hash_password, verify_password


# Create a new event
def create_event(db: Session, event: schemas.EventCreate):
    db_event = models.Event(
        title=event.title,
        description=event.description,
        event_date=event.event_date,
        event_time=event.event_time
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


# Get all events
def get_events(db: Session):
    return db.query(models.Event).all()


# Get a single event by ID
def get_event(db: Session, event_id: int):
    return db.query(models.Event).filter(models.Event.id == event_id).first()
# Update an event
def update_event(db: Session, event_id: int, updated_event: schemas.EventCreate):
    event = db.query(models.Event).filter(models.Event.id == event_id).first()

    if event is None:
        return None

    event.title = updated_event.title
    event.description = updated_event.description
    event.event_date = updated_event.event_date
    event.event_time = updated_event.event_time

    db.commit()
    db.refresh(event)

    return event
# Delete an event
def delete_event(db: Session, event_id: int):
    event = db.query(models.Event).filter(models.Event.id == event_id).first()

    if event is None:
        return None

    db.delete(event)
    db.commit()

    return event
# Create a new user
def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = hash_password(user.password)

    db_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


# Get user by email
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()
# Verify user login
def login_user(db: Session, email: str, password: str):
    user = db.query(models.User).filter(
        models.User.email == email
    ).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    return user