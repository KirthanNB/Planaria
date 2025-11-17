from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from main import build_agent
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

# Check API key
if not os.getenv('GOOGLE_API_KEY'):
    print("❌ ERROR: GOOGLE_API_KEY not found!")
    print("Visit: https://makersuite.google.com/app/apikey")
    exit(1)

app = FastAPI(
    title="Planaria AI API (Gemini)", 
    version="1.0.0",
    description="AI Agent Builder powered by Google Gemini"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AgentRequest(BaseModel):
    agent_type: str
    use_case: str
    desired_model: str = "gemini-1.5-flash"
    personality: str
    target_framework: str
    additional_requirements: str = ""

class AgentResponse(BaseModel):
    success: bool
    message: str
    result: dict = None
    error: str = None

@app.get("/")
def read_root():
    return {
        "message": "Planaria AI Backend API (Gemini-Powered)",
        "version": "1.0.0",
        "model": "Google Gemini",
        "cost": "FREE",
        "endpoints": {
            "build": "/build-agent",
            "health": "/health",
            "models": "/models"
        }
    }

@app.get("/health")
def health_check():
    has_api_key = bool(os.getenv('GOOGLE_API_KEY'))
    return {
        "status": "healthy" if has_api_key else "missing_api_key",
        "gemini_configured": has_api_key
    }

@app.get("/models")
def list_models():
    """List available Gemini models"""
    return {
        "models": [
            {
                "id": "gemini-1.5-flash",
                "name": "Gemini 1.5 Flash",
                "description": "Fast and efficient, best for most use cases",
                "free": True,
                "recommended": True
            },
            {
                "id": "gemini-1.5-flash-8b",
                "name": "Gemini 1.5 Flash 8B",
                "description": "Smaller, faster model for simple tasks",
                "free": True,
                "recommended": False
            },
            {
                "id": "gemini-1.5-pro",
                "name": "Gemini 1.5 Pro",
                "description": "Most capable, best for complex tasks",
                "free": True,
                "recommended": False
            },
            {
                "id": "gemini-pro",
                "name": "Gemini Pro",
                "description": "Previous generation, still reliable",
                "free": True,
                "recommended": False
            }
        ]
    }

@app.post("/build-agent", response_model=AgentResponse)
async def create_agent(request: AgentRequest):
    """
    Build an AI agent using Gemini based on user requirements
    """
    try:
        user_input = request.dict()
        
        # Validate input
        if not user_input.get('agent_type'):
            raise HTTPException(400, "agent_type is required")
        
        if not user_input.get('use_case'):
            raise HTTPException(400, "use_case is required")
        
        if not user_input.get('target_framework'):
            raise HTTPException(400, "target_framework is required")
        
        # Build agent
        print(f"\n📥 Received request to build {user_input['agent_type']} agent")
        result = build_agent(user_input)
        
        if result:
            return AgentResponse(
                success=True,
                message="Agent built successfully with Gemini",
                result={"output": str(result)}
            )
        else:
            return AgentResponse(
                success=False,
                message="Failed to build agent",
                error="CrewAI execution failed"
            )
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return AgentResponse(
            success=False,
            message="Failed to build agent",
            error=str(e)
        )

if __name__ == "__main__":
    print("\n🚀 Starting Planaria AI API Server (Gemini)")
    print("="*60)
    print("Powered by: Google Gemini (FREE)")
    print("API Docs: http://localhost:8000/docs")
    print("="*60 + "\n")
    
    uvicorn.run(app, host="0.0.0.0", port=8000)