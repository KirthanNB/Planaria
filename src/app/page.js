"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Heroexperience from '@/components/Heroexperience';
export default function Home() {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Create floating geometric shapes
    const geometries = [
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.OctahedronGeometry(0.5, 0),
      new THREE.TetrahedronGeometry(0.5, 0),
    ];

    const material = new THREE.MeshPhongMaterial({
      color: 0x9333ea,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    const meshes = [];
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const mesh = new THREE.Mesh(geometry, material.clone());
      
      mesh.position.x = (Math.random() - 0.5) * 10;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = (Math.random() - 0.5) * 10;
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      mesh.userData.velocity = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        rotation: (Math.random() - 0.5) * 0.02,
      };
      
      scene.add(mesh);
      meshes.push(mesh);
    }

    // Lighting
    const light1 = new THREE.DirectionalLight(0x9333ea, 1);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x3b82f6, 0.5);
    light2.position.set(-5, -5, -5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Animation loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      meshes.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.velocity.rotation;
        mesh.rotation.y += mesh.userData.velocity.rotation;
        
        mesh.position.x += mesh.userData.velocity.x;
        mesh.position.y += mesh.userData.velocity.y;

        if (Math.abs(mesh.position.x) > 6) mesh.userData.velocity.x *= -1;
        if (Math.abs(mesh.position.y) > 6) mesh.userData.velocity.y *= -1;
      });

      camera.position.x += (mousePosition.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-mousePosition.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [mousePosition]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* 3D Background Canvas */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />

      {/* Animated gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 -z-10 animate-pulse" style={{ animationDuration: '8s' }} />

      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-6 px-6 relative z-10 backdrop-blur-sm">
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
          PLANARIA AI
        </h1>

        

        <div className="flex items-center space-x-6">
          <a href="#features" className="text-gray-300 hover:text-purple-400 transition-all hover:scale-110">Features</a>
          <a href="#pricing" className="text-gray-300 hover:text-purple-400 transition-all hover:scale-110">Pricing</a>
          <a href="#demo" className="text-gray-300 hover:text-purple-400 transition-all hover:scale-110">Demo</a>
          <a href="#login" className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-purple-400 hover:text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
            Login
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
        <div className="inline-block mb-6 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm font-medium backdrop-blur-sm animate-bounce" style={{ animationDuration: '3s' }}>
          ✨ Now with GPT-4, Claude, and Gemini Support
        </div>

        <h2 className="text-6xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in">
          Build Your Own AI Agent  
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            Without Writing Code.
          </span>
        </h2>

        <p className="text-gray-400 mt-6 text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
          A developer-first platform where you can create, customize, test, and deploy AI agents 
          (chatbots, image models, video assistants, automation agents) — instantly with full source code ready for integration.
        </p>

        <div className="mt-12 flex justify-center space-x-4 animate-fade-in-delay-2">
          <button className="group relative bg-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 overflow-hidden">
            <span className="relative z-10">Start Building Free</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button className="border border-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 hover:border-purple-500 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 backdrop-blur-sm">
            Watch Demo →
          </button>
        </div>

        {/* Floating code preview */}
        <div className="mt-16 max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all hover:scale-105 animate-fade-in-delay-3">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="ml-4 text-gray-500 text-sm">agent.py</span>
          </div>
          <pre className="text-left text-sm text-gray-300 font-mono overflow-x-auto">
            <code>{`import planaria_ai as pai

# Build your agent in 3 lines
agent = pai.Agent(
    type="chatbot",
    model="gpt-4",
    personality="helpful developer assistant"
)

# Test it
response = agent.chat("How do I deploy this?")

# Export production-ready code
agent.export(format="react", path="./my-agent")`}</code>
          </pre>
        </div>
      </section>
<Heroexperience/>
      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <h3 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Why Developers Choose Planaria
        </h3>
        <p className="text-center text-gray-400 mb-16 text-lg">Everything you need to ship AI-powered products faster</p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Build Any AI",
              desc: "Chatbot, image generator, video agent, automation AI, embeddings — all configurable with a single agent builder.",
              icon: "🤖"
            },
            {
              title: "Your APIs, Auto-Integrated",
              desc: "Bring your own keys (Google, OpenAI, Groq, Gemini). We generate full backend code with your APIs wired in.",
              icon: "🔌"
            },
            {
              title: "Instant Deployable Code",
              desc: "Download plug-and-play React, Python, or Node components with detailed integration steps.",
              icon: "⚡"
            },
            {
              title: "Real-Time Testing Sandbox",
              desc: "Test your agent in our interactive environment before exporting the code.",
              icon: "🧪"
            },
            {
              title: "Fully Customizable Agents",
              desc: "Personalities, tools, retrieval, workflows, chains — everything editable for production use.",
              icon: "🎨"
            },
            {
              title: "Developer-Friendly Pricing",
              desc: "Free tier included, pay only for advanced features and agent exports.",
              icon: "💰"
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-8 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-800 hover:border-purple-500 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h4 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors">{feature.title}</h4>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <h3 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          See How It Works
        </h3>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
          Watch as Planaria transforms your requirements into production-ready AI agents with full source code in seconds.
        </p>

        <div className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 border border-gray-800 rounded-2xl p-12 text-center backdrop-blur-md hover:shadow-2xl hover:shadow-purple-500/30 transition-all">
          <div className="max-w-3xl mx-auto">
            <div className="bg-black/50 rounded-xl p-8 mb-8 border border-purple-500/30">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="text-left">
                  <div className="text-sm text-gray-400">Building Agent...</div>
                  <div className="text-lg font-semibold text-purple-400">Customer Support Chatbot</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-gray-500">Model</div>
                  <div className="text-white font-semibold">GPT-4</div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-gray-500">Status</div>
                  <div className="text-green-400 font-semibold">✓ Ready</div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded-lg">
                  <div className="text-gray-500">Lines</div>
                  <div className="text-white font-semibold">247</div>
                </div>
              </div>
            </div>
            
            <button className="group relative bg-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 overflow-hidden">
              <span className="relative z-10">Try the Live Agent Builder →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity animate-gradient" />
            </button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <h3 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h3>
        <p className="text-center text-gray-400 mb-16 text-lg">Choose the plan that fits your workflow</p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Free",
              desc: "For beginners and open-source devs",
              price: "$0",
              features: ["Basic agent builder", "1 code export / month", "Community support", "Public agents only"],
              cta: "Get Started",
              featured: false
            },
            {
              name: "Pro",
              desc: "Best for indie developers",
              price: "$19",
              period: "/mo",
              features: ["Unlimited code exports", "All AI models", "Private agents", "Priority support", "Integration guides"],
              cta: "Go Pro",
              featured: true
            },
            {
              name: "Enterprise",
              desc: "For startups & teams",
              price: "Custom",
              features: ["Team workspaces", "Private agent hosting", "Custom AI models", "Dedicated engineer", "SLA & compliance"],
              cta: "Contact Sales",
              featured: false
            }
          ].map((plan, i) => (
            <div
              key={i}
              className={`group p-8 bg-gray-900/50 backdrop-blur-md rounded-2xl border transition-all hover:scale-105 cursor-pointer ${
                plan.featured 
                  ? 'border-purple-500 shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50' 
                  : 'border-gray-800 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20'
              }`}
            >
              {plan.featured && (
                <div className="text-center mb-4">
                  <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              <h4 className="text-2xl font-semibold mb-2">{plan.name}</h4>
              <p className="text-gray-400 mb-6">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-gray-400 text-lg">{plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start text-gray-300">
                    <span className="text-purple-400 mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
                plan.featured
                  ? 'bg-purple-600 hover:bg-purple-700 hover:shadow-xl hover:shadow-purple-500/50'
                  : 'bg-white text-black hover:bg-purple-400 hover:text-white'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-blue-900/50 backdrop-blur-md rounded-3xl p-16 text-center border border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transition-all">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Ship Your First AI Agent?
          </h3>
          <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of developers building production-ready AI applications without the complexity.
          </p>
          <button className="group relative bg-white text-black px-10 py-4 rounded-xl text-lg font-bold hover:bg-purple-400 hover:text-white transition-all hover:scale-110 hover:shadow-2xl hover:shadow-white/30 overflow-hidden">
            <span className="relative z-10">Start Building Now →</span>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-12 text-center relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center space-x-8 mb-6 text-gray-400">
            <a href="#" className="hover:text-purple-400 transition-colors">Docs</a>
            <a href="#" className="hover:text-purple-400 transition-colors">API</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Blog</a>
            <a href="#" className="hover:text-purple-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Discord</a>
          </div>
          <p className="text-gray-500">
            © {new Date().getFullYear()} Planaria AI — Build Smarter, Ship Faster.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }
        
        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.6s both;
        }
      `}</style>
    </div>
  );
}