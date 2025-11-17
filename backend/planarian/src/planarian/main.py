#!/usr/bin/env python
import sys
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Check for Gemini API key
if not os.getenv('GOOGLE_API_KEY'):
    print("❌ ERROR: GOOGLE_API_KEY not found in .env file")
    print("\n📝 To get a FREE Gemini API key:")
    print("1. Visit: https://makersuite.google.com/app/apikey")
    print("2. Click 'Create API Key'")
    print("3. Copy the key")
    print("4. Add to .env file: GOOGLE_API_KEY=your_key_here")
    sys.exit(1)

from crew import PlanarianCrew

def build_agent(user_input):
    """
    Build an AI agent using Gemini
    
    Args:
        user_input (dict): User requirements
    """
    
    print("🚀 Starting Planaria AI Agent Builder (Gemini-Powered)...")
    print(f"📋 Building {user_input.get('agent_type')} agent...")
    print(f"🤖 Using Model: {user_input.get('desired_model', 'gemini-1.5-flash')}")
    print()
    
    # Initialize the crew
    try:
        crew = PlanarianCrew().crew()
        
        # Execute with inputs
        result = crew.kickoff(inputs=user_input)
        
        print("\n" + "="*60)
        print("✅ AGENT BUILT SUCCESSFULLY!")
        print("="*60)
        print(result)
        print("\n" + "="*60)
        
        return result
        
    except Exception as e:
        print(f"\n❌ Error building agent: {e}")
        import traceback
        traceback.print_exc()
        return None

def run():
    """Run with example input"""
    
    # Example user input
    user_input = {
        'agent_type': 'chatbot',
        'use_case': 'Customer support assistant for a SaaS product',
        'desired_model': 'gemini-1.5-flash',
        'personality': 'helpful and professional',
        'target_framework': 'react',
        'additional_requirements': 'Should handle billing, features, and troubleshooting questions'
    }
    
    print("="*60)
    print("PLANARIA AI - GEMINI AGENT BUILDER")
    print("="*60)
    print(f"\nAgent Type: {user_input['agent_type']}")
    print(f"Use Case: {user_input['use_case']}")
    print(f"Model: {user_input['desired_model']}")
    print(f"Framework: {user_input['target_framework']}")
    print("\n" + "="*60 + "\n")
    
    result = build_agent(user_input)
    
    return result

if __name__ == "__main__":
    run()