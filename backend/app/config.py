import logging
from pydantic_settings import BaseSettings
from functools import lru_cache
from azure.keyvault.secrets import SecretClient
from azure.identity import ManagedIdentityCredential

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Settings(BaseSettings):
    PROJECT_NAME: str = "Azure AI Models Demo"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
   
    # Key Vault configurations
    KEY_VAULT_URL: str
    MANAGED_IDENTITY_CLIENT_ID: str
   
    # CORS configurations
    BACKEND_CORS_ORIGINS: list[str] = ["*"]

    class Config:
        case_sensitive = True
        env_file = ".env"
        env_file_encoding = 'utf-8'
        extra = 'ignore'

class KeyVaultSettings:
    def __init__(self, settings: Settings):
        try:
            logger.info("Initializing KeyVault with Managed Identity...")
            credential = ManagedIdentityCredential(
                client_id=settings.MANAGED_IDENTITY_CLIENT_ID
            )
            
            self.kv_client = SecretClient(
                vault_url=settings.KEY_VAULT_URL,
                credential=credential
            )
            logger.info("KeyVault client initialized successfully")
            
            self._secrets = {}
            
        except Exception as e:
            logger.error(f"KeyVault initialization failed: {str(e)}")
            raise
   
    def get_secret(self, secret_name: str) -> str:
        try:
            if secret_name not in self._secrets:
                secret = self.kv_client.get_secret(secret_name)
                self._secrets[secret_name] = secret.value
            return self._secrets[secret_name]
        except Exception as e:
            logger.error("Failed to get secret. An error occurred.")
            raise

@lru_cache()
def get_settings() -> Settings:
    return Settings(_env_file=None)

@lru_cache()
def get_keyvault_settings() -> KeyVaultSettings:
    return KeyVaultSettings(get_settings())

settings = get_settings()
keyvault = get_keyvault_settings()