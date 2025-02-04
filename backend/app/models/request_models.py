from pydantic import BaseModel, Field
from typing import Optional, Dict

class GenerateRequest(BaseModel):
    model: str = Field(..., description="The model to use for generation")
    prompt: str = Field(..., description="The prompt to generate from")
    parameters: Optional[Dict] = Field(
        default=None,
        description="Optional model parameters like temperature, max_tokens, etc."
    )

    class Config:
        json_schema_extra = {
            "example": {
                "model": "gpt4",
                "prompt": "Explain quantum computing in simple terms",
                "parameters": {
                    "temperature": 0.7,
                    "max_tokens": 800
                }
            }
        }

class GenerateResponse(BaseModel):
    response: str = Field(..., description="The generated response")
    model: str = Field(..., description="The model used for generation")
    prompt: str = Field(..., description="The original prompt")
    usage: Optional[Dict] = Field(
        default=None,
        description="Token usage information"
    )