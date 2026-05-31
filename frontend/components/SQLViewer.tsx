import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Terminal, Database, Link, Cpu, Layers, Info, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SQLViewerProps {
  sql: string;
  logs: string[];
  source?: string;
}

export const SQLViewer: React.FC<SQLViewerProps> = ({ sql, logs, source }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  if (!sql) return null;

  const isSimulation = source === 'LOCAL_SIMULATION' || source === 'CURATED_SIMULATION';

  // Professional Terminology Mapping
  const displayLogs = isSimulation ? [
    "[Engine] Activating Curated Incident Scenario...",
    "[Engine] Simulating Cross-Source JOIN (GitHub ↔ Linear)...",
    "[Engine] Injecting High-Fidelity Mock Data for Demo Stability...",
    "[Engine] Resolution Complete. ✅"
  ] : logs;

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-xl overflow-hidden shadow-xl mt-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Terminal className="text-cyan-500" size={18} />
          <span className="font-bold text-slate-300 font-serif">Coral SQL Execution Plan</span>
          <div className="flex items-center gap-2 ml-4">
            <Badge label="MCP: GitHub" color="cyan" />
            <Badge label="MCP: Linear" color="purple" />
            {isSimulation ? (
               <div className="group relative">
                  <Badge label="SIMULATION ACTIVE" color="cyan" pulse />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-[10px] text-slate-300 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-slate-700 shadow-xl">
                    Using curated data to ensure consistent demo experience.
                  </div>
               </div>
            ) : (
              <Badge label="Cache: HIT" color="emerald" />
            )}
          </div>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-slate-500" /> : <ChevronDown size={20} className="text-slate-500" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6 space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                <Database size={12} />
                Generated SQL
              </div>
              <div className="p-4 bg-black rounded-lg border border-slate-800 font-mono text-sm overflow-x-auto whitespace-pre relative group">
                <SQLHighlighter sql={sql} onJoinHover={(hovering) => setShowTooltip(hovering)} />
                
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 w-64 shadow-2xl z-10 pointer-events-none"
                    >
                      <div className="flex items-center gap-2 mb-1 font-bold text-cyan-400">
                        <Info size={12} />
                        Dynamic Mapping
                      </div>
                      Coral automatically maps GitHub Repo IDs to Linear Service Tags without API glue code.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                <Cpu size={12} />
                Step-by-Step Resolution
              </div>
              <div className="space-y-1 bg-black/30 p-4 rounded-lg border border-slate-800/50">
                {displayLogs.map((log, i) => (
                  <div key={i} className="flex items-center gap-3 font-mono text-xs py-1 group">
                    <span className="text-slate-600 shrink-0">[{i+1}]</span>
                    <span className={log.includes("Complete") || log.includes("Resolved") ? "text-emerald-500 font-bold" : "text-slate-400"}>
                      {log}
                    </span>
                    {log.includes("JOIN") && <Link size={12} className="text-purple-500 animate-pulse" />}
                    {(log.includes("Complete") || log.includes("Resolved")) && <CheckCircle2 size={12} className="text-emerald-500" />}
                    {log.includes("Cache") && <Layers size={12} className="text-emerald-500" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Badge = ({ label, color, pulse = false }: { label: string, color: 'cyan' | 'purple' | 'emerald', pulse?: boolean }) => {
  const colors = {
    cyan: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border flex items-center gap-1.5 ${colors[color]}`}>
      {pulse && <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${color === 'cyan' ? 'bg-cyan-500' : 'bg-emerald-500'}`} />}
      {label}
    </span>
  );
};

const SQLHighlighter = ({ sql, onJoinHover }: { sql: string, onJoinHover: (h: boolean) => void }) => {
  const keywords = ['SELECT', 'FROM', 'JOIN', 'ON', 'WHERE', 'AND', 'LIKE', 'INNER'];
  
  const parts = sql.split(/(\s+)/);
  return (
    <span className="font-mono">
      {parts.map((part, i) => {
        if (keywords.includes(part.toUpperCase())) {
          if (part.toUpperCase() === 'JOIN') {
            return (
              <span 
                key={i} 
                onMouseEnter={() => onJoinHover(true)}
                onMouseLeave={() => onJoinHover(false)}
                className="text-cyan-400 font-bold underline decoration-cyan-500/30 decoration-dashed cursor-help"
              >
                {part}
              </span>
            );
          }
          return <span key={i} className="text-cyan-400 font-bold">{part}</span>;
        }
        if (part.startsWith("'") || part.endsWith("'")) {
          return <span key={i} className="text-emerald-400">{part}</span>;
        }
        return <span key={i} className="text-slate-300">{part}</span>;
      })}
    </span>
  );
};
