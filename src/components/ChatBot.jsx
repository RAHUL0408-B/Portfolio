import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, RefreshCw, Sparkles, Terminal } from 'lucide-react';
import Anthropic from '@anthropic-ai/sdk';
import { resumeData } from '../data/resumeData';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi, I'm Rahul's AI assistant! Ask me anything about his projects, skills, education, or hackathon wins.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check if the API key is present in environment
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (apiKey && apiKey !== 'your_anthropic_api_key_here') {
      setIsApiKeySet(true);
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom of message logs
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const presetQuestions = [
    "What's your strongest project?",
    "Do you know Spring Boot?",
    "Tell me about your hackathon wins.",
    "Are you open to internships?"
  ];

  // Smart Mock Answers for the AI to guarantee 100% functionality without API keys
  const getMockAnswer = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('spring') || q.includes('boot')) {
      return "Rahul is currently exploring **Spring Boot** to expand his backend expertise! He has a solid foundation in Java and Object-Oriented Programming (OOP) concepts from his B.E. in Computer Engineering and Talent Battle internship, and is now learning to build enterprise APIs using Spring Boot.";
    }
    if (q.includes('project') || q.includes('strongest')) {
      return "Rahul's strongest project is **EcoBounty**, an AI-Based Environmental Reporting Platform that won the **Best Solution Award** at Techathon 3.0. It integrates React.js, Node.js, and Firebase with AI-assisted verification APIs to validate community environmental reports, reducing spam submissions by ~30%.";
    }
    if (q.includes('hackathon') || q.includes('win') || q.includes('techathon') || q.includes('award')) {
      return "Rahul is a seasoned hackathon builder! He won the **Best Solution Award** at **Techathon 3.0 (2026)** out of hundreds of competing teams for his project EcoBounty. He also received a **Certificate of Appreciation** at the **Pandora Hackathon (2026)** in the AI for Smart Cities track.";
    }
    if (q.includes('intern') || q.includes('job') || q.includes('opportunity') || q.includes('work') || q.includes('open')) {
      return "Yes, Rahul is actively seeking Software Engineering / Full-Stack Developer internships and opportunities! He is currently working as a Software Developer Intern at **NextGenTech** (Pune), collaborating within an agile engineering team on production codebases, code reviews, and Git workflows. Feel free to contact him at **rahulbramhankar04@gmail.com** or +91 70571 67045.";
    }
    if (q.includes('skill') || q.includes('tech') || q.includes('database') || q.includes('language')) {
      return "Rahul's core stack includes:\n\n• **Languages:** Java, JavaScript, HTML, CSS\n• **Frameworks:** React.js, Node.js, REST APIs, Hibernate\n• **Databases:** MySQL, MongoDB, PostgreSQL\n• **Cloud/Platforms:** Firebase, Supabase, AWS (SageMaker ML prep)\n• **Tools:** Git, GitHub, Postman, Vite, VS Code";
    }
    if (q.includes('education') || q.includes('college') || q.includes('cgpa')) {
      return "Rahul is pursuing a **B.E. in Computer Engineering** at JSPM's BSIOTR, Pune (2023–2027) with an excellent **CGPA of 8.6/10**. He completed his HSC with 91.5% and SSC with 85.8% from Nagpur.";
    }
    if (q.includes('fintaxvers') || q.includes('tax')) {
      return "Rahul built **FinTaxVers.com** as a freelance Full-Stack Developer. It's a production tax consultancy platform built with React, Vite, and Firebase that successfully reduced client onboarding time by ~30% through automated inquiry routing and dynamic, SEO-optimized service pages.";
    }
    if (q.includes('unmatrix') || q.includes('interior')) {
      return "Rahul developed **Unmatrix** as a freelance Full-Stack Developer. It's a Shopify-style interior estimation platform featuring design lists, cart management, and a dynamic backend cost-estimation engine that generates proposals instantly.";
    }
    if (q.includes('agriguard') || q.includes('plant')) {
      return "**Agriguard** is an AI-Powered Plant Disease Triage System Rahul built in 2025. It integrates IoT sensor telemetry (temperature, moisture, humidity) with a Python Machine Learning model for early-stage crop disease detection.";
    }
    
    // Default fallback chat response
    return "I'm Rahul's AI assistant. Rahul is a Full-Stack Developer (React, Node, Firebase) and Computer Engineering student with CGPA 8.6/10. He won Techathon 3.0 with EcoBounty and has built production freelance apps like FinTaxVers.com. Feel free to ask me about his project details, skills, or experience!";
  };

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if (!isApiKeySet) {
      // API Key is not configured yet: Execute Smart Mock Response
      setTimeout(() => {
        const mockResponse = getMockAnswer(query);
        setMessages((prev) => [...prev, { role: 'assistant', content: mockResponse }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      // Retrieve key and initialize SDK with client-side access header enabled
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      const anthropic = new Anthropic({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true, // required for client-side sandbox usage
      });

      // Injecting contextual resume data into system prompt
      const systemPrompt = `
        You are a smart, professional, and friendly AI chatbot assistant representing Rahul Bramhankar. 
        Your goal is to answer developer/recruiter questions about Rahul accurately and impress them.
        Keep answers clear, highly informative, and use bullet points or markdown where applicable.
        
        Here is Rahul's complete profile data:
        - Name: Rahul Bramhankar (Full-Stack Developer, +91 70571 67045, rahulbramhankar04@gmail.com, LinkedIn: linkedin.com/in/rahulbramhankar, GitHub: github.com/RAHUL0408-B)
        - Bio: Computer Engineering student (2023-2027, JSPM's BSIOTR Pune, CGPA: 8.6/10) with freelance full-stack client deliverables and hackathon awards.
        - Core Tech: Java, JavaScript, React.js, Node.js, Firebase, MySQL, MongoDB, PostgreSQL, Supabase, Git, Postman, Vite, Hibernate, REST APIs.
        - Currently Exploring: Docker, Spring Boot, Solidity, Selenium.
        - Strongest Project: EcoBounty (React, Node, Firebase, AI Verification APIs) — AI Environmental reporting. Won Best Solution Award at Techathon 3.0 (2026) out of hundreds of teams.
        - Freelance 1: FinTaxVers.com (React, Vite, Firebase, EmailJS) — reduced onboarding by 30%.
        - Freelance 2: Unmatrix — Interior design cost estimator platform.
        - Internship: Software Developer Intern at NextGenTech (Feb 2026 - Present), Pune.
        - Other Projects: Agriguard (Python, ML, IoT sensors), Temple Donation Management (MySQL, HTML, CSS, JS).
        - Awards: Winner of Techathon 3.0 (2026), Pandora Hackathon Appreciation Certificate (2026).
        
        Guidelines:
        1. Be enthusiastic, polite, and represent Rahul in the third person ("Rahul did X...", "He knows Y...").
        2. If asked about Spring Boot, explain he is "Currently Exploring" it but has strong core Java/OOP foundations.
        3. Provide contact info (rahulbramhankar04@gmail.com / +91 70571 67045) for recruiters wanting to reach out.
      `;

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          ...messages
            .filter((m) => m.role === 'user' || m.role === 'assistant')
            .map((m) => ({ role: m.role, content: m.content })),
          { role: 'user', content: query },
        ],
      });

      const textResponse = response.content[0]?.text || "Sorry, I couldn't process that response.";
      setMessages((prev) => [...prev, { role: 'assistant', content: textResponse }]);
    } catch (error) {
      console.error('Anthropic API Error:', error);
      // Fall back to Mock answer on error
      const mockResponse = getMockAnswer(query);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `${mockResponse}\n\n*(Claude API failed or returned CORS. Showing offline resume mock answer)*` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating bubble button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-cyan to-cyan-dim hover:shadow-cyan-glow p-4 rounded-full text-bg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center border border-cyan/20"
        aria-label="Ask Rahul AI Chatbot"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat window panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] z-50 glass rounded-2xl shadow-card border border-border overflow-hidden flex flex-col justify-between animate-slide-up">
          
          {/* Header */}
          <div className="px-4 py-3 bg-surface border-b border-border/80 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-cyan/15 border border-cyan/30 text-cyan">
                <Bot className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h3 className="font-sans font-bold text-sm text-text-primary flex items-center space-x-1">
                  <span>Ask Rahul AI</span>
                  <Sparkles className="w-3 h-3 text-cyan animate-pulse" />
                </h3>
                <p className="text-[10px] font-mono text-cyan-dim">
                  {isApiKeySet ? 'Connected to Claude Sonnet' : 'Offline / Smart Mock mode'}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => {
                setMessages([
                  {
                    role: 'assistant',
                    content: "Hi, I'm Rahul's AI assistant! Ask me anything about his projects, skills, education, or hackathon wins.",
                  },
                ]);
              }}
              title="Reset Chat"
              className="text-text-secondary hover:text-cyan p-1.5 rounded-lg hover:bg-surface/50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages scroll area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3.5 bg-bg/60 custom-scrollbar flex flex-col">
            {messages.map((m, idx) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={idx}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm font-sans text-left leading-relaxed ${
                    isUser
                      ? 'bg-cyan/10 border border-cyan/30 text-text-primary self-end rounded-tr-none'
                      : 'bg-surface border border-border text-text-secondary self-start rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  {m.content}
                </div>
              );
            })}
            
            {isLoading && (
              <div className="bg-surface border border-border text-text-secondary self-start rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Presets and Chat input */}
          <div className="p-3 bg-surface border-t border-border/80 space-y-2.5">
            {/* Presets suggestions (only shown if simple intro) */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-1.5 justify-start">
                {presetQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-[10px] sm:text-xs font-mono text-cyan-dim bg-cyan/5 border border-cyan/15 rounded-full px-3 py-1 hover:bg-cyan/10 hover:border-cyan transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input field */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something..."
                className="flex-grow bg-surface border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm font-sans focus:border-cyan focus:outline-none transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 rounded-xl bg-cyan hover:shadow-cyan-glow text-bg font-bold disabled:opacity-50 transition-all flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
