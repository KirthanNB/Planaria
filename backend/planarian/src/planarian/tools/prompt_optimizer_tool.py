from crewai.tools import tool

@tool("Prompt Optimizer")
def optimize_prompt(use_case: str, personality: str, model: str) -> dict:
    """
    Optimizes system prompts for Gemini models using best practices.
    
    Args:
        use_case: The use case for the AI agent
        personality: Desired personality traits
        model: Target AI model (gemini-pro, gemini-1.5-flash, etc.)
    
    Returns:
        Dictionary with optimized prompt and metadata
    """
    
    # Gemini-specific optimizations
    gemini_config = {
        'prefix': 'You are',
        'style': 'clear and conversational',
        'supports': ['long_context', 'multimodal', 'json_output']
    }
    
    # Build optimized prompt
    prompt_parts = []
    
    # Role definition
    prompt_parts.append(f"{gemini_config['prefix']} a {personality} assistant.")
    
    # Use case specific instructions
    prompt_parts.append(f"\n\nYour primary function is: {use_case}")
    
    # Behavioral guidelines
    prompt_parts.append("\n\nGuidelines:")
    prompt_parts.append("- Always provide accurate and helpful information")
    prompt_parts.append("- If unsure, acknowledge uncertainty honestly")
    prompt_parts.append("- Maintain a consistent personality throughout the conversation")
    prompt_parts.append("- Follow user instructions carefully")
    prompt_parts.append("- Be concise but thorough in your responses")
    
    optimized_prompt = "".join(prompt_parts)
    
    return {
        'optimized_prompt': optimized_prompt,
        'model_features': gemini_config['supports'],
        'style_guide': gemini_config['style'],
        'token_estimate': len(optimized_prompt.split()) * 1.3
    }