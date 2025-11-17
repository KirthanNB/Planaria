from crewai_tools import BaseTool
from typing import Type
from pydantic import BaseModel, Field
import os

class TemplateManagerInput(BaseModel):
    """Input for Template Manager Tool"""
    framework: str = Field(..., description="Framework: react, python, or node")
    
class TemplateManagerTool(BaseTool):
    name: str = "Template Manager"
    description: str = (
        "Manages code templates for different frameworks. "
        "Retrieves and validates templates."
    )
    args_schema: Type[BaseModel] = TemplateManagerInput

    def _run(self, framework: str) -> dict:
        """Get template information"""
        
        template_dir = os.path.join(
            os.path.dirname(__file__), 
            '..', '..', 
            'knowledge', 
            'code_templates'
        )
        
        template_files = {
            'react': 'react_template.txt',
            'python': 'python_template.txt',
            'node': 'node_template.txt'
        }
        
        if framework not in template_files:
            return {
                'success': False,
                'error': f'Unsupported framework: {framework}'
            }
        
        template_path = os.path.join(
            template_dir, 
            template_files[framework]
        )
        
        exists = os.path.exists(template_path)
        
        return {
            'success': exists,
            'framework': framework,
            'template_path': template_path if exists else None,
            'available_frameworks': list(template_files.keys())
        }