from jose import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer


# =========================================================
# JWT SETTINGS
# =========================================================

SECRET_KEY = "mysecretkey123"
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60


# =========================================================
# OAUTH2
# =========================================================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/token"
)


# =========================================================
# PASSWORD HASHING
# =========================================================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str
):
    return pwd_context.verify(
        plain_password,
        hashed_password
    )


# =========================================================
# CREATE JWT TOKEN
# =========================================================

def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt