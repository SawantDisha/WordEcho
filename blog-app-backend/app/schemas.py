from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    # token_type: str
    id: int
    name: str
    email: str

class BlogCreate(BaseModel):
    title: str
    content: str

class BlogUpdate(BaseModel):
    title: str
    content: str

class CommentCreate(BaseModel):
    content: str
