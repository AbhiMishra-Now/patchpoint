import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Terminal, Database, Link, Cpu } from 'lucide-react';

interface CoralQueryLogProps {
  sql: string;
  logs: string[];
}

export const CoralQueryLog: React.FC<CoralQueryLogProps> = ({ sql, logs }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!sql) return null;

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-xl overflow-hidden shadow-xl mt-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Terminal className="text-cyan-500" size={18} />
          <span className="font-bold text-slate-300">Coral SQL Execution Log</span>
          <div className="flex items-center gap-2 ml-4">
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-500 text-[10px] font-mono border border-cyan-500/20">MCP: GITHUB</span>
            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-500 text-[10px] font-mono border border-purple-500/20">MCP: LINEAR</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 text-[10px] font-mono border border-blue-500/20">MCP: SLACK</span>
          </div>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-slate-500" /> : <ChevronDown size={20} className="text-slate-500" />}
      </button>

      {isOpen && (
        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase">
              <Database size={12} />
              Generated SQL
            </div>
            <div className="p-4 bg-black/60 rounded-lg border border-slate-800/80 font-mono text-sm text-cyan-400 overflow-x-auto whitespace-pre">
              {sql}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase">
              <Cpu size={12} />
              Step-by-Step Resolution
            </div>
            <div className="space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="flex items-center gap-3 font-mono text-xs py-1 group">
                  <span className="text-slate-600">[{i+1}]</span>
                  <span className={log.includes("Resolved") ? "text-emerald-500" : "text-slate-400 group-hover:text-slate-300 transition-colors"}>
                    {log}
                  </span>
                  {log.includes("JOIN") && <Link size={12} className="text-purple-500 animate-pulse" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
