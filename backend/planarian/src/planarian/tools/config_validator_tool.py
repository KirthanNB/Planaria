from crewai.tools import tool

@tool("Config Validator")
def validate_config(config: dict) -> dict:
    """
    Validates agent configuration for completeness and best practices.
    
    Args:
        config: Agent configuration dictionary
    
    Returns:
        Dictionary with validation results
    """
    
    issues = []
    warnings = []
    recommendations = []
    
    # Required fields
    required_fields = ['name', 'model', 'system_prompt']
    for field in required_fields:
        if field not in config or not config[field]:
            issues.append(f"Missing required field: {field}")
    
    # Model validation for Gemini
    valid_gemini_models = [
        'gemini-pro',
        'gemini-1.5-pro',
        'gemini-1.5-flash',
        'gemini-1.5-flash-8b'
    ]
    
    model = config.get('model', '')
    if model and model not in valid_gemini_models:
        warnings.append(f"Model {model} may not be valid. Valid models: {', '.join(valid_gemini_models)}")
    
    # System prompt validation
    system_prompt = config.get('system_prompt', '')
    if len(system_prompt) < 20:
        issues.append("System prompt is too short (< 20 characters)")
    elif len(system_prompt) > 8000:
        warnings.append("System prompt is very long, may impact performance")
    
    # Security checks
    dangerous_terms = ['ignore previous', 'disregard', 'override instructions']
    for term in dangerous_terms:
        if term.lower() in system_prompt.lower():
            warnings.append(f"Potentially dangerous term in prompt: '{term}'")
    
    # Recommendations
    if not config.get('personality'):
        recommendations.append("Consider adding a personality trait for better user experience")
    
    if config.get('type') == 'chatbot' and len(system_prompt) < 100:
        recommendations.append("For chatbots, consider a more detailed system prompt")
    
    # Calculate score
    score = 100
    score -= len(issues) * 20
    score -= len(warnings) * 5
    score = max(0, score)
    
    status = 'pass' if score >= 80 else 'warning' if score >= 60 else 'fail'
    
    return {
        'status': status,
        'score': score,
        'issues': issues,
        'warnings': warnings,
        'recommendations': recommendations,
        'valid': len(issues) == 0
    }