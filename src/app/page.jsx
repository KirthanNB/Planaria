"use client";

import React from "react";
import Hero from "@/components/Landing/Hero";
import RevealOnScroll from "@/components/common/RevealOnScroll";

const Home = () => {
  return (
    <div>

      {/* HERO loads normally */}
      <Hero />

      {/* PRICING SECTION - SCROLL TRIGGER */}
      <RevealOnScroll delay={0.2}>
        <section id="features" data-animate className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="text-center mb-20">
          <h3 className="text-5xl font-bold mb-6 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Why Developers Choose Planaria
          </h3>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">Everything you need to ship AI-powered products faster</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Build Any AI",
              desc: "Chatbot, image generator, video agent, automation AI, embeddings — all configurable with a single agent builder.",
              icon: "🤖",
              color: "from-purple-500 to-pink-500"
            },
            {
              title: "Your APIs, Auto-Integrated",
              desc: "Bring your own keys (Google, OpenAI, Groq, Gemini). We generate full backend code with your APIs wired in.",
              icon: "🔌",
              color: "from-blue-500 to-cyan-500"
            },
            {
              title: "Instant Deployable Code",
              desc: "Download plug-and-play React, Python, or Node components with detailed integration steps.",
              icon: "⚡",
              color: "from-yellow-500 to-orange-500"
            },
            {
              title: "Real-Time Testing Sandbox",
              desc: "Test your agent in our interactive environment before exporting the code.",
              icon: "🧪",
              color: "from-green-500 to-emerald-500"
            },
            {
              title: "Fully Customizable Agents",
              desc: "Personalities, tools, retrieval, workflows, chains — everything editable for production use.",
              icon: "🎨",
              color: "from-pink-500 to-rose-500"
            },
            {
              title: "Developer-Friendly Pricing",
              desc: "Free tier included, pay only for advanced features and agent exports.",
              icon: "💰",
              color: "from-indigo-500 to-purple-500"
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative p-8 bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-3xl border border-gray-800 hover:border-purple-500/50 transition-all hover:scale-105 cursor-pointer overflow-hidden"
              style={{ 
                animationDelay: `${i * 100}ms`,
                transition: `all 0.6s ease-out ${i * 100}ms`
              }}
            >
              {/* linear orb effect */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br ${feature.color} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-300 inline-block">{feature.icon}</div>
                <h4 className="text-2xl font-semibold mb-4 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all">{feature.title}</h4>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
              
              {/* Hover border animation */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity">
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-r ${feature.color} opacity-20 blur-xl`}></div>
              </div>
            </div>
          ))}
        </div>
      </section>


        <section
          id="pricing"
          className="max-w-7xl mx-auto px-6 py-32 relative z-10"
        >
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold mb-6 bg-linear-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h3>
            <p className="text-gray-400 text-xl">
              Choose the plan that fits your workflow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                desc: "For beginners and open-source devs",
                price: "$0",
                features: [
                  "Basic agent builder",
                  "1 code export / month",
                  "Community support",
                  "Public agents only",
                ],
                cta: "Get Started",
                featured: false,
              },
              {
                name: "Pro",
                desc: "Best for indie developers",
                price: "$19",
                period: "/mo",
                features: [
                  "Unlimited code exports",
                  "All AI models",
                  "Private agents",
                  "Priority support",
                  "Integration guides",
                ],
                cta: "Go Pro",
                featured: true,
              },
              {
                name: "Enterprise",
                desc: "For startups & teams",
                price: "Custom",
                features: [
                  "Team workspaces",
                  "Private agent hosting",
                  "Custom AI models",
                  "Dedicated engineer",
                  "SLA & compliance",
                ],
                cta: "Contact Sales",
                featured: false,
              },
            ].map((plan, i) => (
              <RevealOnScroll delay={0.15 * i} key={i}>
                <div
                  className={`group relative p-10 bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border transition-all hover:scale-105 cursor-pointer overflow-hidden ${
                    plan.featured
                      ? "border-purple-500 shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 transform scale-105"
                      : "border-gray-800 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20"
                  }`}
                >
                  {/* linear background */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${
                      plan.featured
                        ? "from-purple-600/20 to-pink-600/20"
                        : "from-purple-600/0 to-pink-600/0"
                    } group-hover:from-purple-600/20 group-hover:to-pink-600/20 transition-all duration-500`}
                  ></div>

                  <div className="relative z-10">
                    {plan.featured && (
                      <div className="text-center mb-6">
                        <span className="bg-linear-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full animate-pulse-slow shadow-lg shadow-purple-500/50">
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    <h4 className="text-3xl font-bold mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                      {plan.name}
                    </h4>
                    <p className="text-gray-400 mb-8">{plan.desc}</p>

                    <div className="mb-8">
                      <span className="text-6xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-400 text-xl ml-2">
                          {plan.period}
                        </span>
                      )}
                    </div>

                    <ul className="space-y-4 mb-10">
                      {plan.features.map((feature, j) => (
                        <li
                          key={j}
                          className="flex items-start text-gray-300 group-hover:text-white transition-colors"
                        >
                          <span className="text-purple-400 mr-3 text-xl">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 relative overflow-hidden group/btn ${
                        plan.featured
                          ? "bg-linear-to-r from-purple-600 to-pink-600 hover:shadow-2xl hover:shadow-purple-500/60 text-white"
                          : "bg-white text-black hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">{plan.cta}</span>
                      {!plan.featured && (
                        <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                      )}
                    </button>
                  </div>

                  {plan.featured && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-500/30 to-transparent rounded-bl-full blur-2xl"></div>
                  )}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* FOOTER - SCROLL TRIGGER */}
      <RevealOnScroll delay={0.3}>
        <footer className="border-t border-gray-800 py-16 relative z-10 backdrop-blur-xl bg-black/40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div>
                <h4 className="text-2xl font-bold mb-4 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  PLANARIA AI
                </h4>
                <p className="text-gray-400 mb-4">
                  Build smarter, ship faster with AI agents.
                </p>
                <div className="flex space-x-4">
                  {["Twitter", "GitHub", "Discord", "LinkedIn"].map(
                    (social, i) => (
                      <a
                        key={i}
                        href="twitter.com"
                        className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                      >
                        <span className="text-xs">{social[0]}</span>
                      </a>
                    )
                  )}
                </div>
              </div>

              {[
                {
                  title: "Product",
                  links: [
                    "Features",
                    "Pricing",
                    "Demo",
                    "Changelog",
                    "Roadmap",
                  ],
                },
                {
                  title: "Resources",
                  links: ["Docs", "API", "Blog", "Tutorials", "Examples"],
                },
                {
                  title: "Company",
                  links: ["About", "Careers", "Contact", "Privacy", "Terms"],
                },
              ].map((column, i) => (
                <div key={i}>
                  <h5 className="font-bold mb-4 text-white">{column.title}</h5>
                  <ul className="space-y-3">
                    {column.links.map((link, j) => (
                      <li key={j}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 inline-block"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Planaria AI. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </RevealOnScroll>
    </div>
  );
};

export default Home;
