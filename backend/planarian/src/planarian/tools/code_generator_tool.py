from crewai.tools import tool
import jinja2
import os
from pathlib import Path

@tool("Code Generator")
def generate_code(framework: str, config: dict, system_prompt: str) -> dict:
    """
    Generates production-ready code in React, Python, or Node.js
    for AI agent integration with Gemini API.
    
    Args:
        framework: Target framework (react, python, or node)
        config: Agent configuration dictionary
        system_prompt: System prompt for the agent
    
    Returns:
        Dictionary with generated code files
    """
    
    # Get template directory
    template_dir = Path(__file__).parent.parent.parent / 'knowledge' / 'code_templates'
    template_dir.mkdir(parents=True, exist_ok=True)
    
    # Create Jinja environment
    env = jinja2.Environment(loader=jinja2.FileSystemLoader(str(template_dir)))
    
    try:
        if framework == "react":
            return generate_react(env, config, system_prompt)
        elif framework == "python":
            return generate_python(env, config, system_prompt)
        elif framework == "node":
            return generate_node(env, config, system_prompt)
        else:
            return {"error": f"Unsupported framework: {framework}"}
    except Exception as e:
        return {"error": str(e)}

def generate_react(env, config, system_prompt):
    """Generate React component for Gemini"""
    
    code = f'''import React, {{ useState }} from 'react';
import {{ GoogleGenerativeAI }} from '@google/generative-ai';

const {config.get('name', 'Agent').replace(' ', '')}Agent = () => {{
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({{ model: '{config.get('model', 'gemini-pro')}' }});

  const SYSTEM_PROMPT = `{system_prompt}`;

  const sendMessage = async () => {{
    if (!input.trim()) return;

    const userMessage = {{ role: 'user', content: input }};
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {{
      // Build conversation context
      const context = SYSTEM_PROMPT + '\\n\\n' + 
        messages.map(m => `${{m.role}}: ${{m.content}}`).join('\\n') +
        `\\nuser: ${{input}}`;

      const result = await model.generateContent(context);
      const response = await result.response;
      const text = response.text();

      const assistantMessage = {{
        role: 'assistant',
        content: text
      }};

      setMessages(prev => [...prev, assistantMessage]);
    }} catch (error) {{
      console.error('Error:', error);
      setMessages(prev => [...prev, {{
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }}]);
    }} finally {{
      setLoading(false);
    }}
  }};

  return (
    <div className="chat-container">
      <div className="messages">
        {{messages.map((msg, i) => (
          <div key={{i}} className={{`message ${{msg.role}}`}}>
            <strong>{{msg.role}}:</strong> {{msg.content}}
          </div>
        ))}}
        {{loading && <div className="loading">Thinking...</div>}}
      </div>
      
      <div className="input-area">
        <input
          value={{input}}
          onChange={{(e) => setInput(e.target.value)}}
          onKeyPress={{(e) => e.key === 'Enter' && sendMessage()}}
          placeholder="Type your message..."
        />
        <button onClick={{sendMessage}} disabled={{loading}}>
          Send
        </button>
      </div>

      <style jsx>{{`
        .chat-container {{
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }}
        .messages {{
          height: 500px;
          overflow-y: auto;
          border: 1px solid #ddd;
          padding: 20px;
          margin-bottom: 20px;
          background: #f9f9f9;
        }}
        .message {{
          margin-bottom: 15px;
          padding: 10px;
          border-radius: 8px;
        }}
        .message.user {{
          background: #e3f2fd;
          text-align: right;
        }}
        .message.assistant {{
          background: #fff;
        }}
        .input-area {{
          display: flex;
          gap: 10px;
        }}
        input {{
          flex: 1;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }}
        button {{
          padding: 12px 24px;
          background: #2196f3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }}
        button:disabled {{
          background: #ccc;
          cursor: not-allowed;
        }}
      `}}</style>
    </div>
  );
}};

export default {config.get('name', 'Agent').replace(' ', '')}Agent;
'''
    
    package_json = f'''{{
  "name": "{config.get('name', 'agent').lower().replace(' ', '-')}",
  "version": "1.0.0",
  "dependencies": {{
    "react": "^18.2.0",
    "@google/generative-ai": "^0.1.0",
    "dotenv": "^16.0.0"
  }}
}}'''
    
    env_example = '''REACT_APP_GOOGLE_API_KEY=your_gemini_api_key_here'''
    
    readme = f'''# {config.get('name', 'AI Agent')}

## Setup

1. Install dependencies:
```bash
   npm install
```

2. Copy .env.example to .env and add your Gemini API key

3. Run:
```bash
   npm start
```

## Get FREE Gemini API Key
Visit: https://makersuite.google.com/app/apikey
'''
    
    return {
        'main_file': code,
        'package_json': package_json,
        'env_example': env_example,
        'readme': readme,
        'framework': 'react'
    }

def generate_python(env, config, system_prompt):
    """Generate Python script for Gemini"""
    
    code = f'''import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

class {config.get('name', 'Agent').replace(' ', '')}Agent:
    def __init__(self):
        genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
        self.model = genai.GenerativeModel('{config.get('model', 'gemini-pro')}')
        
        self.system_prompt = """{system_prompt}"""
        self.conversation_history = []
    
    def chat(self, user_message):
        """Send a message and get a response"""
        
        self.conversation_history.append({{
            'role': 'user',
            'content': user_message
        }})
        
        try:
            # Build conversation context
            context = self.system_prompt + "\\n\\n"
            for msg in self.conversation_history:
                context += f"{{msg['role']}}: {{msg['content']}}\\n"
            
            response = self.model.generate_content(context)
            assistant_message = response.text
            
            self.conversation_history.append({{
                'role': 'assistant',
                'content': assistant_message
            }})
            
            return assistant_message
            
        except Exception as e:
            print(f"Error: {{e}}")
            return "Sorry, I encountered an error. Please try again."
    
    def reset_conversation(self):
        """Clear conversation history"""
        self.conversation_history = []

def main():
    """Example usage"""
    agent = {config.get('name', 'Agent').replace(' ', '')}Agent()
    
    print("Agent initialized. Type 'quit' to exit.\\n")
    
    while True:
        user_input = input("You: ")
        
        if user_input.lower() in ['quit', 'exit', 'q']:
            print("Goodbye!")
            break
        
        response = agent.chat(user_input)
        print(f"\\nAgent: {{response}}\\n")

if __name__ == "__main__":
    main()
'''
    
    requirements = '''google-generativeai>=0.8.0
python-dotenv>=1.0.0'''
    
    env_example = '''GOOGLE_API_KEY=your_gemini_api_key_here'''
    
    readme = f'''# {config.get('name', 'AI Agent')}

## Setup

1. Install dependencies:
```bash
   pip install -r requirements.txt
```

2. Copy .env.example to .env and add your Gemini API key

3. Run:
```bash
   python main.py
```

## Get FREE Gemini API Key
Visit: https://makersuite.google.com/app/apikey
'''
    
    return {
        'main_file': code,
        'requirements': requirements,
        'env_example': env_example,
        'readme': readme,
        'framework': 'python'
    }

def generate_node(env, config, system_prompt):
    """Generate Node.js script for Gemini"""
    
    code = f'''import dotenv from 'dotenv';
import {{ GoogleGenerativeAI }} from '@google/generative-ai';
import readline from 'readline';

dotenv.config();

class {config.get('name', 'Agent').replace(' ', '')}Agent {{
  constructor() {{
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    this.model = genAI.getGenerativeModel({{ model: '{config.get('model', 'gemini-pro')}' }});
    
    this.systemPrompt = `{system_prompt}`;
    this.conversationHistory = [];
  }}

  async chat(userMessage) {{
    this.conversationHistory.push({{
      role: 'user',
      content: userMessage
    }});

    try {{
      // Build conversation context
      const context = this.systemPrompt + '\\n\\n' +
        this.conversationHistory
          .map(m => `${{m.role}}: ${{m.content}}`)
          .join('\\n');
      
      const result = await this.model.generateContent(context);
      const response = await result.response;
      const assistantMessage = response.text();

      this.conversationHistory.push({{
        role: 'assistant',
        content: assistantMessage
      }});

      return assistantMessage;

    }} catch (error) {{
      console.error('Error:', error);
      return 'Sorry, I encountered an error. Please try again.';
    }}
  }}

  resetConversation() {{
    this.conversationHistory = [];
  }}
}}

// CLI Interface
async function main() {{
  const agent = new {config.get('name', 'Agent').replace(' ', '')}Agent();
  
  const rl = readline.createInterface({{
    input: process.stdin,
    output: process.stdout
  }});

  console.log('Agent initialized. Type "quit" to exit.\\n');

  const askQuestion = () => {{
    rl.question('You: ', async (input) => {{
      if (input.toLowerCase() === 'quit' || input.toLowerCase() === 'exit') {{
        console.log('Goodbye!');
        rl.close();
        return;
      }}

      const response = await agent.chat(input);
      console.log(`\\nAgent: ${{response}}\\n`);
      
      askQuestion();
    }});
  }};

  askQuestion();
}}

main();

export default {config.get('name', 'Agent').replace(' ', '')}Agent;
'''
    
    package_json = f'''{{
  "name": "{config.get('name', 'agent').lower().replace(' ', '-')}",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {{
    "@google/generative-ai": "^0.1.0",
    "dotenv": "^16.0.0"
  }}
}}'''
    
    env_example = '''GOOGLE_API_KEY=your_gemini_api_key_here'''
    
    readme = f'''# {config.get('name', 'AI Agent')}

## Setup

1. Install dependencies:
```bash
   npm install
```

2. Copy .env.example to .env and add your Gemini API key

3. Run:
```bash
   node main.js
```

## Get FREE Gemini API Key
Visit: https://makersuite.google.com/app/apikey
'''
    
    return {
        'main_file': code,
        'package_json': package_json,
        'env_example': env_example,
        'readme': readme,
        'framework': 'node'
    }