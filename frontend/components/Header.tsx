import React from 'react';
import { Shield, Activity, Zap, Layers } from 'lucide-react';

interface HeaderProps {
  latency?: number;
  apiSaved?: number;
  cacheHit?: boolean;
  source?: string;
}

export const Header: React.FC<HeaderProps> = ({ latency = 0, apiSaved = 0, cacheHit = false, source }) => {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50 font-sans">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
          <Shield className="text-cyan-500" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tight font-serif">
            PatchPoint
          </h1>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-none">
            Coral SQL Impact Mapper
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <MetricBadge 
          icon={<Activity size={14} />} 
          label="Latency" 
          value={`${latency}ms`} 
          color="cyan" 
        />
        <MetricBadge 
          icon={<Zap size={14} />} 
          label="API Saved" 
          value={`${apiSaved}`} 
          color="emerald" 
        />
        <MetricBadge 
          icon={<Layers size={14} />} 
          label="Cache" 
          value={cacheHit ? "HIT" : "MISS"} 
          color={cacheHit ? "emerald" : "amber"} 
        />
        <div className="h-6 w-[1px] bg-slate-800 mx-2" />
        {source && (
          <div className="flex items-center gap-2 mr-4">
            <div className={`w-2 h-2 rounded-full animate-pulse ${source === 'REAL_MCP' ? 'bg-emerald-500' : 'bg-cyan-500'}`} />
            <span className={`text-[10px] font-mono font-bold uppercase ${source === 'REAL_MCP' ? 'text-emerald-400' : 'text-cyan-400'}`}>
              {source === 'REAL_MCP' ? 'LIVE MCP CONNECTED' : 'SIMULATION ACTIVE'}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-slate-400">ENGINE ONLINE</span>
        </div>
      </div>
    </header>
  );
};

const MetricBadge = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: 'cyan' | 'emerald' | 'amber' }) => {
  const colors = {
    cyan: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${colors[color]} backdrop-blur-md`}>
      <span className="opacity-70">{icon}</span>
      <span className="text-[10px] font-mono uppercase opacity-50">{label}</span>
      <span className="text-xs font-bold font-mono">{value}</span>
    </div>
  );
};
