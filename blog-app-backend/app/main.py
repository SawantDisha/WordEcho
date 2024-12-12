from fastapi import FastAPI
from app.routes import user, blog, comment
from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

# Create tables
Base.metadata.create_all(bind=engine)

# Initialize app
app = FastAPI()


# Allow CORS for your React app's domain (and port)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


# Include routes
app.include_router(user.router, prefix="/users", tags=["Users"])
app.include_router(blog.router, prefix="/blogs", tags=["Blogs"])
app.include_router(comment.router, prefix="/comments", tags=["Comments"])
