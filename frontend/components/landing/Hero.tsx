import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface HeroProps {
  onLaunch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunch }) => {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-mono uppercase tracking-widest"
          >
            <ShieldCheck size={14} />
            Unified Impact Mapping
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white leading-[1.1]"
          >
            Your vulnerabilities are <br />
            <span className="text-cyan-500 italic">silently</span> spreading.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-xl leading-relaxed"
          >
            PatchPoint joins GitHub code, Linear ownership, and Slack context into one unified security query. Stop jumping between tabs. Start resolving incidents in seconds.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button 
              onClick={onLaunch}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center gap-2"
            >
              Launch Dashboard <ArrowRight size={18} />
            </button>
            <button 
              onClick={onLaunch}
              className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white rounded-xl font-bold transition-all"
            >
              Contact Security Team
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: -10 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative perspective-1000 hidden lg:block"
        >
          <div className="bg-slate-900/60 backdrop-blur-3xl border border-slate-700/50 rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-3">
            <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
              <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">Live Security Resolution</span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20 border border-rose-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-rose-500/10 border-l-4 border-rose-500 rounded-r-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-[10px] text-rose-500 font-bold uppercase">Critical Impact</span>
                  <span className="font-mono text-xs text-slate-400">auth-service</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Package</div>
                    <div className="font-mono text-sm text-slate-200">log4j-core</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Risk Score</div>
                    <div className="font-mono text-sm text-rose-500 font-bold">9.8 / 10</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">AC</div>
                  <span>Owner: <span className="text-slate-100">@Alice Chen</span></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">L</div>
                  <span>SLA: <span className="text-rose-400 font-bold">Tier-1 (4hr)</span></span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-500/20 blur-[100px] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};
