import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export const DemoPreview: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "SELECT repo, owner, risk FROM github JOIN linear ON github.id = linear.repo_id WHERE package = 'log4j'";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        setTimeout(() => { i = 0; }, 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
      >
        One Query. Total Visibility.
      </motion.h2>
      <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
        No API glue code. No context switching. Just SQL.
      </p>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl mx-auto bg-black rounded-2xl border border-slate-800 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-700" />
            <div className="w-2 h-2 rounded-full bg-slate-700" />
            <div className="w-2 h-2 rounded-full bg-slate-700" />
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Coral SQL Sandbox</span>
          <div className="w-6" />
        </div>
        
        <div className="p-8 text-left font-mono text-lg space-y-6 min-h-[300px]">
          <div className="flex items-center gap-3">
            <span className="text-emerald-500">bash &gt;</span>
            <span className="text-slate-200">patchpoint scan --package log4j --tier 1</span>
          </div>
          
          <div className="flex gap-3">
            <span className="text-cyan-500 shrink-0">SQL &gt;</span>
            <span className="text-cyan-400 break-all leading-relaxed">
              {displayText}
              <span className="animate-pulse">_</span>
            </span>
          </div>
          
          <div className="pt-8 border-t border-slate-900 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Terminal size={12} />
              <span>Analyzing dependencies in 142 repositories...</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Terminal size={12} />
              <span>Mapping on-call ownership from Slack #eng-auth...</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-500/70 font-bold uppercase tracking-wider">
              <span>✅ Resolution Complete in 420ms</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
