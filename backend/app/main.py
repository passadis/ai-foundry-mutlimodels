import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.routes import router as api_router
import time

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION
)

# Middleware for logging requests
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    
    try:
        # Log the incoming request
        logger.info(f"Request: {request.method} {request.url}")
        if request.method in ["POST", "PUT"]:
            body = await request.body()
            logger.info(f"Request body: {body.decode()}")
            
        response = await call_next(request)
        
        # Log the response
        process_time = time.time() - start_time
        logger.info(f"Response status: {response.status_code}")
        logger.info(f"Process time: {process_time:.2f}s")
        
        return response
        
    except Exception as e:
        logger.error(f"Request failed: {str(e)}", exc_info=True)
        raise

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For testing, replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api/v1")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}