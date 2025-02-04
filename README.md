<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=azure,react,ts,python,vite,docker" />
  </a>
</p>

<h1 align="center">Azure AI Foundry Models Demo</h1>

## Introduction

A serverless web application demonstrating the capabilities of different Azure AI Foundry models. This project provides an interactive interface to test and compare three powerful AI models:
- DeepSeek (Problem-solving focus)
- GPT-4 (Complex reasoning)
- Phi-3 (Efficient general tasks)

## Features

- Interactive UI for model testing
- Real-time performance metrics
- Response history tracking
- Performance comparison between models
- Token usage analytics
- Response time measurements

## Tech Stack

### Frontend
- React + TypeScript
- Vite
- TailwindCSS
- shadcn/ui components
- Environment-based configuration

### Backend
- Python FastAPI
- Azure Key Vault integration
- Azure Managed Identity
- Docker containerization

## Architecture

The application uses:
- Azure Container Apps for hosting
- Azure Key Vault for secrets
- Azure AI Foundry models
- User-assigned Managed Identity

## Development

1. Clone the repository
2. Set up environment variables:

Frontend (.env):
```
VITE_BACKEND_URL=/api/v1
```

Backend (.env):
```
KEY_VAULT_URL=your-keyvault-url
MANAGED_IDENTITY_CLIENT_ID=your-managed-identity
```

3. Start the development servers:

Frontend:
```bash
cd frontend
npm install
npm run dev
```

Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
python run.py
```



## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Architecture

![architecture-mm](https://github.com/user-attachments/assets/619903f0-ad17-4a7d-9a5f-559243beaf71)

