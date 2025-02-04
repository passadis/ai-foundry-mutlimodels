import logging
from typing import Dict, Optional
from openai import AzureOpenAI
from azure.ai.inference import ChatCompletionsClient
from azure.core.credentials import AzureKeyCredential
from app.config import settings, keyvault

logger = logging.getLogger(__name__)

class AzureAIService:
    MODEL_CONFIGS = {
        "deepseek": {
            "endpoint": keyvault.get_secret("AZURE_DEEPSEEK_ENDPOINT"),  # Remove /v1/chat/completions
            "client_type": "inference",
            "key_name": "azure-api-deep-key",
            "description": "Advanced reasoning and problem-solving capabilities",
            "system_prompt": """You are DeepSeek, an advanced AI assistant with strong reasoning and analytical capabilities.""",
            "default_params": {
                "temperature": 0.7,
                "max_tokens": 800,
                "top_p": 0.95,
                "frequency_penalty": 0,
                "presence_penalty": 0,
            }
        },
        "gpt4": {
            "endpoint": keyvault.get_secret("AZURE_GPT_ENDPOINT"),
            "deployment": "gpt-4",
            "client_type": "openai",
            "key_name": "azure-api-gpt-key",
            "description": "Powerful model for complex tasks and reasoning",
            "system_prompt": """You are GPT-4, a highly capable AI assistant trained to be helpful, harmless, and honest.""",
            "default_params": {
                "temperature": 0.7,
                "max_tokens": 800,
                "top_p": 0.95,
                "frequency_penalty": 0,
                "presence_penalty": 0,
            }
        },
        "phi": {
            "endpoint": keyvault.get_secret("AZURE_PHI_ENDPOINT"),  # Remove /v1/chat/completions
            "client_type": "inference",
            "key_name": "azure-api-phi-key",
            "description": "Efficient model for general tasks",
            "system_prompt": """You are Phi-3, an efficient and focused AI assistant.""",
            "default_params": {
                "temperature": 0.8,
                "max_tokens": 2048,
                "top_p": 0.1,
                "frequency_penalty": 0,
                "presence_penalty": 0,
            }
        }
    }

    def __init__(self):
        self.clients: Dict[str, any] = {}
        logger.info("Initialized AzureAIService")

    def _get_client(self, model: str):
        """Get or create a client for a specific model"""
        if model not in self.clients:
            try:
                config = self.MODEL_CONFIGS[model]
                api_key = keyvault.get_secret(config["key_name"])
                logger.info(f"Creating client for model: {model}")

                if config["client_type"] == "openai":
                    self.clients[model] = AzureOpenAI(
                        api_key=api_key,
                        api_version="2024-02-15-preview",  # Updated API version
                        azure_endpoint=config["endpoint"]
                    )
                else:  # inference client
                    self.clients[model] = ChatCompletionsClient(
                        endpoint=config["endpoint"],
                        credential=AzureKeyCredential(api_key)
                    )
                logger.info(f"Successfully created client for model: {model}")
            except Exception as e:
                logger.error(f"Failed to create client for model {model}: {str(e)}")
                raise

        return self.clients[model]

    async def generate(
        self,
        model: str,
        prompt: str,
        parameters: Optional[Dict] = None
    ) -> Dict:
        try:
            if model not in self.MODEL_CONFIGS:
                raise ValueError(f"Model {model} not found")

            config = self.MODEL_CONFIGS[model]
            client = self._get_client(model)
            
            messages = [
                {
                    "role": "system",
                    "content": config["system_prompt"]
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]

            params = {
                **config["default_params"],
                **(parameters or {})
            }

            logger.info(f"Generating response for model: {model}")
            logger.info(f"Using endpoint: {config['endpoint']}")
            logger.info(f"Request parameters: {params}")

            if config["client_type"] == "openai":
                try:
                    completion = client.chat.completions.create(
                        model=config["deployment"],
                        messages=messages,
                        **params
                    )
                    response_data = {
                        "response": completion.choices[0].message.content,
                        "model": model,
                        "prompt": prompt,
                        "usage": {
                            "prompt_tokens": completion.usage.prompt_tokens,
                            "completion_tokens": completion.usage.completion_tokens,
                            "total_tokens": completion.usage.total_tokens
                        }
                    }
                except Exception as e:
                    logger.error(f"OpenAI client error: {str(e)}", exc_info=True)
                    raise
            else:
                try:
                    payload = {
                        "messages": messages,
                        **params
                    }
                    logger.info(f"Inference client payload: {payload}")
                    response = client.complete(payload)
                    response_data = {
                        "response": response.choices[0].message.content,
                        "model": model,
                        "prompt": prompt,
                        "usage": {
                            "prompt_tokens": response.usage.prompt_tokens,
                            "completion_tokens": response.usage.completion_tokens,
                            "total_tokens": response.usage.total_tokens
                        }
                    }
                except Exception as e:
                    logger.error(f"Inference client error: {str(e)}", exc_info=True)
                    raise

            logger.info(f"Successfully generated response for model: {model}")
            return response_data

        except Exception as e:
            logger.error(f"Error generating response for model {model}: {str(e)}")
            raise

# Create a singleton instance
ai_service = AzureAIService()