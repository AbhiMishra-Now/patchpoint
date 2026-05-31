import React from 'react';
import { motion } from 'framer-motion';
import { Link2, Sparkles, Brain, Cpu } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Link2 size={24} className="text-cyan-400" />}
            title="Cross-Source JOINs"
            description="Execute standard SQL across APIs. Link GitHub code to Linear owners instantly with zero middleware."
            stat="420ms Avg Latency"
            span="col-span-1 lg:col-span-2"
          />
          <FeatureCard 
            icon={<Sparkles size={24} className="text-purple-400" />}
            title="AI Synthesis"
            description="Auto-drafts Slack alerts with full remediation context. One click to dispatch to the right engineer."
            stat="94% Accuracy"
          />
          <FeatureCard 
            icon={<Brain size={24} className="text-emerald-400" />}
            title="Schema Learning"
            description="Coral maps your internal tools automatically. No manual cataloging or tagging required."
            stat="Zero Config"
          />
          <FeatureCard 
            icon={<Cpu size={24} className="text-rose-400" />}
            title="Token Efficiency"
            description="Our SQL-first approach reduces LLM context usage by 90% compared to traditional RAG."
            stat="10x Savings"
            span="col-span-1 lg:col-span-2"
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description, stat, span = "col-span-1" }: { icon: React.ReactNode, title: string, description: string, stat: string, span?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`${span} group p-8 bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-col justify-between hover:bg-slate-900/60 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]`}
  >
    <div>
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm mb-8">{description}</p>
    </div>
    <div className="font-mono text-[10px] text-cyan-500 font-bold uppercase tracking-widest bg-cyan-500/5 border border-cyan-500/10 px-3 py-1 rounded-full self-start">
      {stat}
    </div>
  </motion.div>
);
