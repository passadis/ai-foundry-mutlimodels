import logging
from fastapi import APIRouter, HTTPException
from app.models.request_models import GenerateRequest, GenerateResponse
from app.services.azure_ai import ai_service

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/generate", response_model=GenerateResponse)
async def generate_response(request: GenerateRequest):
    """
    Generate a response using the specified AI model
    """
    try:
        logger.info(f"Received request for model: {request.model}")
        logger.info(f"Request parameters: {request.parameters}")
        
        result = await ai_service.generate(
            model=request.model,
            prompt=request.prompt,
            parameters=request.parameters
        )
        
        logger.info("Successfully generated response")
        return GenerateResponse(**result)
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error generating response: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500, 
            detail=f"Internal server error: {str(e)}"
        )