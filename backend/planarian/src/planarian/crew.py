from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai import LLM
import os

# Import tools using the @tool decorator
from tools.code_generator_tool import generate_code
from tools.prompt_optimizer_tool import optimize_prompt
from tools.config_validator_tool import validate_config

@CrewBase
class PlanarianCrew():
    """Planaria AI Agent Builder Crew using Gemini"""
    
    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'
    
    def __init__(self):
        # Initialize Gemini model using CrewAI's built-in LLM
        # FIX: Changed model identifier from "gemini/gemini-pro" to "gemini-pro" 
        # for compatibility with LiteLLM/CrewAI and the Google AI SDK.
        self.llm = LLM(
    model="gemini-2.5-flash-lite",
    api_key=os.getenv("GEMINI_API_KEY")
)
    
    @agent
    def config_analyst(self) -> Agent:
        return Agent(
            config=self.agents_config['config_analyst'],
            tools=[validate_config],
            llm=self.llm,
            verbose=True
        )
    
    @agent
    def prompt_engineer(self) -> Agent:
        return Agent(
            config=self.agents_config['prompt_engineer'],
            tools=[optimize_prompt],
            llm=self.llm,
            verbose=True
        )
    
    @agent
    def code_generator(self) -> Agent:
        return Agent(
            config=self.agents_config['code_generator'],
            tools=[generate_code],
            llm=self.llm,
            verbose=True
        )
    
    @agent
    def qa_specialist(self) -> Agent:
        return Agent(
            config=self.agents_config['qa_specialist'],
            tools=[validate_config],
            llm=self.llm,
            verbose=True
        )
    
    @agent
    def documentation_writer(self) -> Agent:
        return Agent(
            config=self.agents_config['documentation_writer'],
            llm=self.llm,
            verbose=True
        )
    
    @task
    def analyze_requirements(self) -> Task:
        return Task(
            config=self.tasks_config['analyze_requirements'],
            agent=self.config_analyst()
        )
    
    @task
    def create_system_prompt(self) -> Task:
        return Task(
            config=self.tasks_config['create_system_prompt'],
            agent=self.prompt_engineer()
        )
    
    @task
    def generate_code(self) -> Task:
        return Task(
            config=self.tasks_config['generate_code'],
            agent=self.code_generator()
        )
    
    @task
    def validate_configuration(self) -> Task:
        return Task(
            config=self.tasks_config['validate_configuration'],
            agent=self.qa_specialist()
        )
    
    @task
    def create_documentation(self) -> Task:
        return Task(
            config=self.tasks_config['create_documentation'],
            agent=self.documentation_writer()
        )
    
    @crew
    def crew(self) -> Crew:
        """Creates the Planarian crew with Gemini"""
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True
        )