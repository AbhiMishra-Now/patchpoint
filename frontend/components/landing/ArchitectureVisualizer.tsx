import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Brain, Database, GitBranch, Ticket, MessageSquare, Zap, AlertTriangle, ArrowRight } from 'lucide-react';

type ViewMode = 'traditional' | 'coral';

export const ArchitectureVisualizer: React.FC = () => {
  const [mode, setMode] = useState<ViewMode>('coral');

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white"
          >
            The Coral Engine: <span className="text-cyan-500 italic">Behind the Scenes</span>
          </motion.h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Experience how we've fundamentally re-engineered the security stack by replacing hundreds of API handlers with a single SQL logic layer.
          </p>
          
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl mt-8">
            <button 
              onClick={() => setMode('traditional')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'traditional' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Traditional Way
            </button>
            <button 
              onClick={() => setMode('coral')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'coral' ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              The Coral Way
            </button>
          </div>
        </div>

        <div className="relative min-h-[600px] flex items-center justify-center bg-slate-900/40 border border-slate-800/50 rounded-3xl p-8 overflow-hidden backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {mode === 'traditional' ? <TraditionalArchitecture /> : <CoralArchitecture />}
          </AnimatePresence>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
           <div className={`p-6 rounded-2xl border transition-all duration-500 ${mode === 'traditional' ? 'bg-rose-500/5 border-rose-500/20' : 'bg-slate-900/40 border-slate-800 opacity-50'}`}>
              <div className="flex items-center gap-3 mb-4 text-rose-500">
                <AlertTriangle size={20} />
                <h4 className="font-bold">Traditional Fragmentation</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Requires hundreds of lines of "glue code" for each API. Every update to GitHub or Linear breaks your integration. Data context is lost between separate requests.
              </p>
           </div>
           <div className={`p-6 rounded-2xl border transition-all duration-500 ${mode === 'coral' ? 'bg-cyan-500/5 border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'bg-slate-900/40 border-slate-800 opacity-50'}`}>
              <div className="flex items-center gap-3 mb-4 text-cyan-500">
                <Zap size={20} />
                <h4 className="font-bold">Unified SQL Resolution</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                PatchPoint uses Coral to treat all APIs as standard SQL tables. No API handlers required. Schema mapping is automated, and auth is handled globally.
              </p>
           </div>
        </div>
      </div>
    </section>
  );
};

const TraditionalArchitecture = () => (
  <motion.div 
    key="traditional"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.1 }}
    className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center"
  >
    <div className="text-center mb-12">
      <span className="text-rose-500 font-mono text-[10px] uppercase tracking-widest bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
        15+ API Integrations Required
      </span>
    </div>
    
    <div className="grid grid-cols-3 gap-12 relative">
      <Node icon={<User />} label="User" color="slate" />
      <Node icon={<Zap />} label="Glue Code" color="rose" />
      <div className="space-y-4">
        <Node icon={<GitBranch />} label="GitHub API" color="slate" small />
        <Node icon={<Ticket />} label="Linear API" color="slate" small />
        <Node icon={<MessageSquare />} label="Slack API" color="slate" small />
      </div>

      {/* Tangled SVG Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible" viewBox="0 0 800 400">
         <path d="M120,200 Q200,100 280,180" stroke="#f43f5e" fill="none" strokeWidth="1" strokeDasharray="4 2" />
         <path d="M120,200 Q200,300 280,220" stroke="#f43f5e" fill="none" strokeWidth="1" strokeDasharray="4 2" />
         <path d="M400,200 L550,100" stroke="#f43f5e" fill="none" strokeWidth="1" />
         <path d="M400,200 L550,200" stroke="#f43f5e" fill="none" strokeWidth="1" />
         <path d="M400,200 L550,300" stroke="#f43f5e" fill="none" strokeWidth="1" />
         <path d="M550,100 Q400,50 120,200" stroke="#f43f5e" fill="none" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
  </motion.div>
);

const CoralArchitecture = () => (
  <motion.div 
    key="coral"
    initial={{ opacity: 0, scale: 1.1 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="relative w-full max-w-5xl flex flex-col items-center"
  >
    <div className="text-center mb-12">
      <span className="text-cyan-500 font-mono text-[10px] uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
        1 SQL Query. Zero Glue Code.
      </span>
    </div>

    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-24 relative">
      <Node icon={<User />} label="User" color="slate" sublabel="Natural Language" />
      <Arrow />
      <Node icon={<Brain />} label="Groq AI" color="llm" sublabel="SQL Translation" />
      <Arrow />
      <Node icon={<Database />} label="Coral SQL" color="coral" sublabel="Unified JOINs" prominent />
      <Arrow />
      <div className="flex flex-col gap-4">
        <Node icon={<GitBranch />} label="GitHub MCP" color="slate" small />
        <Node icon={<Ticket />} label="Linear MCP" color="slate" small />
        <Node icon={<MessageSquare />} label="Slack MCP" color="slate" small />
      </div>

      {/* Clean Animated Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible" viewBox="0 0 1000 400">
         <motion.circle r="3" fill="#06B6D4">
           <animateMotion dur="5s" repeatCount="indefinite" path="M100,200 L250,200 L450,200 L650,150" />
         </motion.circle>
         <motion.circle r="3" fill="#06B6D4">
           <animateMotion dur="5s" repeatCount="indefinite" path="M100,200 L250,200 L450,200 L650,200" />
         </motion.circle>
         <motion.circle r="3" fill="#06B6D4">
           <animateMotion dur="5s" repeatCount="indefinite" path="M100,200 L250,200 L450,200 L650,250" />
         </motion.circle>
      </svg>
    </div>
  </motion.div>
);

const Node = ({ icon, label, color, sublabel, prominent = false, small = false }: any) => {
  const colors: any = {
    slate: "border-slate-800 text-slate-400 bg-slate-900/50",
    rose: "border-rose-500 text-rose-500 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.3)]",
    coral: "border-cyan-500 text-cyan-500 bg-cyan-500/10 shadow-[0_0_25px_rgba(6,182,212,0.4)]",
    llm: "border-violet-500 text-violet-500 bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.3)]",
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`relative flex flex-col items-center ${prominent ? 'z-10' : ''}`}
    >
      <div className={`rounded-2xl border-2 flex items-center justify-center transition-all ${small ? 'w-12 h-12' : prominent ? 'w-24 h-24' : 'w-20 h-20'} ${colors[color]}`}>
        {icon}
      </div>
      <div className={`mt-3 text-center ${small ? 'text-[10px]' : 'text-xs'} font-bold text-white font-serif uppercase tracking-wider`}>{label}</div>
      {sublabel && <div className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-tighter">{sublabel}</div>}
    </motion.div>
  );
};

const Arrow = () => (
  <div className="hidden md:flex items-center text-slate-700">
    <ArrowRight size={24} />
  </div>
);
