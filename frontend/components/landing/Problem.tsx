import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Ticket, MessageSquare } from 'lucide-react';

export const Problem: React.FC = () => {
  return (
    <section id="problem" className="py-24 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            The Fragmentation Tax.
          </motion.h2>
          <p className="text-lg text-slate-400">
            Security teams waste 60% of their time just finding who owns what. 
            Fragmented data tools create a "visibility debt" that compounds during every incident.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProblemCard 
            icon={<GitBranch size={24} className="text-cyan-500" />}
            title="GitHub"
            description="Code and dependencies live here. Vulnerabilities are detected, but context is missing."
            delay={0.1}
          />
          <ProblemCard 
            icon={<Ticket size={24} className="text-purple-500" />}
            title="Linear / Jira"
            description="Ownership and priority live here. Tickets are stale because they lack real-time code data."
            delay={0.2}
          />
          <ProblemCard 
            icon={<MessageSquare size={24} className="text-emerald-500" />}
            title="Slack"
            description="On-call context lives here. Important alerts get buried in noise without attribution."
            delay={0.3}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-1 rounded-full bg-slate-800/50 border border-slate-700">
            <div className="px-6 py-2 rounded-full bg-slate-900 font-mono text-sm text-slate-300">
              Connecting them manually takes hours. <span className="text-cyan-400 font-bold">Coral does it in 420ms.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProblemCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-8 bg-slate-900/40 border border-slate-800/50 rounded-2xl hover:border-slate-700 transition-all group"
  >
    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
);
