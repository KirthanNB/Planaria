#!/usr/bin/env python
"""
Test script for Planaria AI Crew with Gemini
"""
import os
import sys
from dotenv import load_dotenv

load_dotenv()

# Check API key
if not os.getenv('GOOGLE_API_KEY'):
    print("❌ ERROR: GOOGLE_API_KEY not found!")
    print("\n📝 Get your FREE Gemini API key:")
    print("Visit: https://makersuite.google.com/app/apikey")
    sys.exit(1)

from main import build_agent

def test_chatbot():
    """Test building a chatbot"""
    print("\n" + "="*60)
    print("TEST 1: Building a Customer Support Chatbot")
    print("="*60 + "\n")
    
    user_input = {
        'agent_type': 'chatbot',
        'use_case': 'Customer support assistant for a SaaS product',
        'desired_model': 'gemini-1.5-flash',
        'personality': 'helpful and professional',
        'target_framework': 'react',
        'additional_requirements': 'Handle billing, features, and troubleshooting questions'
    }
    
    result = build_agent(user_input)
    return result

def test_code_assistant():
    """Test building a code assistant"""
    print("\n" + "="*60)
    print("TEST 2: Building a Python Code Assistant")
    print("="*60 + "\n")
    
    user_input = {
        'agent_type': 'code-assistant',
        'use_case': 'Python coding helper for data science tasks',
        'desired_model': 'gemini-1.5-pro',
        'personality': 'technical and detailed',
        'target_framework': 'python',
        'additional_requirements': 'Expert in pandas, numpy, and matplotlib'
    }
    
    result = build_agent(user_input)
    return result

def test_simple():
    """Simple quick test"""
    print("\n" + "="*60)
    print("SIMPLE TEST: Basic Chatbot")
    print("="*60 + "\n")
    
    user_input = {
        'agent_type': 'chatbot',
        'use_case': 'Friendly general assistant',
        'desired_model': 'gemini-1.5-flash',
        'personality': 'friendly',
        'target_framework': 'python',
        'additional_requirements': 'None'
    }
    
    result = build_agent(user_input)
    return result

if __name__ == "__main__":
    print("\n🚀 PLANARIA AI - GEMINI TEST SUITE")
    print("="*60)
    
    # Run simple test first
    try:
        print("\n▶ Running simple test...")
        test_simple()
        print("\n✅ Simple test completed!")
    except Exception as e:
        print(f"\n❌ Simple test failed: {e}")
        import traceback
        traceback.print_exc()
    
    # Uncomment to run more tests
    # test_chatbot()
    # test_code_assistant()