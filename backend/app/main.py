from fastapi import FastAPI, Depends, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text

from .database import engine, Base, SessionLocal
from . import models, schemas, crud
from .routers import events
from .security import create_access_token


# ==========================================
# CREATE FASTAPI APP
# ==========================================

app = FastAPI()


# ==========================================
# DATABASE TABLES
# ==========================================

Base.metadata.create_all(bind=engine)


# ==========================================
# DATABASE MIGRATION
# Add user_id to old events table
# ==========================================

try:
    with engine.connect() as conn:

        columns = conn.execute(
            text("PRAGMA table_info(events)")
        ).fetchall()

        column_names = [column[1] for column in columns]

        if "user_id" not in column_names:

            conn.execute(
                text(
                    "ALTER TABLE events ADD COLUMN user_id INTEGER"
                )
            )

            conn.commit()

            print("user_id column added successfully")

        else:

            print("user_id column already exists")

except Exception as e:

    print("Database migration error:", e)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://personalcalendar-e166.onrender.com",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ==========================================
# EVENTS ROUTER
# ==========================================

app.include_router(events.router)


# ==========================================
# DATABASE DEPENDENCY
# ==========================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# ==========================================
# HOME
# ==========================================

@app.get("/")
def home():

    return {
        "message": "Welcome to Personal Cloud Calendar API!"
    }


# ==========================================
# REGISTER
# ==========================================

@app.post("/register")
def register_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = crud.get_user_by_email(
        db,
        user.email
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    return crud.create_user(
        db,
        user
    )


# ==========================================
# NORMAL LOGIN
# Used by your React frontend
# ==========================================

@app.post("/login")
def login(
    user: schemas.UserLogin,
    db: Session = Depends(get_db)
):

    db_user = crud.login_user(
        db,
        user.email,
        user.password
    )

    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={
            "sub": db_user.email
        }
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": db_user.id,
        "name": db_user.name,
        "email": db_user.email
    }


# ==========================================
# TOKEN LOGIN
# Used by Swagger Authorize button
# ==========================================

@app.post("/token")
def token(
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):

    db_user = crud.login_user(
        db,
        username,
        password
    )

    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={
            "sub": db_user.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }