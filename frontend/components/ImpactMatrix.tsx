import React from 'react';
import { CoralResultRow } from '../lib/types';
import { AlertTriangle, User, Hash, MessageSquare, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImpactMatrixProps {
  data: CoralResultRow[];
}

export const ImpactMatrix: React.FC<ImpactMatrixProps> = ({ data }) => {
  if (data.length === 0) return (
    <div className="p-12 text-center text-slate-500 font-mono text-sm border border-dashed border-slate-800 rounded-xl">
      No resolution data found for the current query parameters.
    </div>
  );

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/50 bg-slate-950/40">
              <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">Repo</th>
              <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">Package</th>
              <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">Version</th>
              <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">Owner</th>
              <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">Risk</th>
              <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">SLA</th>
              <th className="px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/30">
            {data.map((row, idx) => (
              <motion.tr 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={idx} 
                className={`group hover:bg-slate-800/40 hover:-translate-y-[1px] transition-all duration-200 ${row.risk > 9 ? 'bg-rose-500/5' : ''}`}
              >
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-100 flex items-center gap-2">
                    {row.repo}
                    {row.risk > 9 && <AlertTriangle size={14} className="text-rose-500 animate-pulse" />}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-cyan-400 text-sm">{row.package}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-slate-400 text-sm">{row.version}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <User size={14} className="opacity-50" />
                    {row.owner}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${
                    row.risk > 9 ? 'bg-rose-500 text-white animate-pulse-red shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 
                    row.risk > 8 ? 'bg-rose-500/80 text-white' :
                    row.risk > 6 ? 'bg-amber-500 text-white' : 
                    'bg-emerald-500 text-white'
                  }`}>
                    {row.risk.toFixed(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${
                    row.sla === 'Tier-1' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                    row.sla === 'Tier-2' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                    'bg-slate-500/10 text-slate-500 border-slate-500/20'
                  }`}>
                    {row.sla}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-30 group-hover:opacity-100 transition-opacity">
                    <Hash size={16} className="text-slate-400 hover:text-white cursor-pointer hover:scale-110 transition-transform" />
                    <MessageSquare size={16} className="text-slate-400 hover:text-white cursor-pointer hover:scale-110 transition-transform" />
                    <ExternalLink size={16} className="text-slate-400 hover:text-white cursor-pointer hover:scale-110 transition-transform" />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
