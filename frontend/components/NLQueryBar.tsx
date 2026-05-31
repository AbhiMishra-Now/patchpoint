import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NLQueryBarProps {
  onQuery: (query: string) => void;
  isLoading: boolean;
  logs: string[];
}

export const NLQueryBar: React.FC<NLQueryBarProps> = ({ onQuery, isLoading, logs }) => {
  const [input, setInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onQuery(input);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-cyan-500/5 blur-2xl rounded-2xl group-hover:bg-cyan-500/10 transition-all duration-500" />
        <div className="relative flex items-center bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-2 shadow-2xl overflow-hidden">
          <div className="pl-4 pr-2 text-slate-500">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Coral: 'Show me log4j vulnerabilities in Tier-1'..."
            className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-600 py-4 px-2 font-medium"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:scale-[1.02] active:scale-[0.98] ${isLoading ? 'animate-pulse' : ''}`}
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : "Resolve Query"}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {(isLoading || logs.length > 0) && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black rounded-xl border border-slate-800 overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900/50">
              <Terminal size={14} className="text-emerald-500" />
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Hybrid Engine Logs</span>
            </div>
            <div className="p-4 h-32 overflow-y-auto font-mono text-xs space-y-1 custom-scrollbar">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-emerald-500/30 shrink-0">{i + 1}</span>
                  <span className="text-emerald-400 font-mono italic">
                    &gt; {log}
                  </span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
