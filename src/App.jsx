import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';

import Achievements from './components/Achievements';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import SocialSidebar from './components/SocialSidebar';

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-cyan selection:text-bg font-sans overflow-x-hidden">
      
      {/* Background radial overlays */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-hero-glow pointer-events-none" />
      
      {/* Navigation Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border/40">
          <About />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border/40">
          <Projects />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border/40">
          <Skills />
        </div>



        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border/40">
          <Achievements />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border/40">
          <Experience />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border/40">
          <Contact />
        </div>
      </main>

      {/* Footer Details */}
      <Footer />

      {/* Floating Interactive Claude Chatbot */}
      <ChatBot />

      {/* Floating Social Links */}
      <SocialSidebar />

    </div>
  );
}
