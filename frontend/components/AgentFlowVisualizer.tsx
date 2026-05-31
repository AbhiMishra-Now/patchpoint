import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Ticket, MessageSquare, Database, Sparkles, CheckCircle2, Info, Terminal as TerminalIcon } from 'lucide-react';

interface AgentNodeProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  status: string;
  color: string;
  isActive: boolean;
  isComplete: boolean;
  diagnostics: string[];
}

const AgentNode: React.FC<AgentNodeProps> = ({ icon, label, status, color, isActive, isComplete, diagnostics }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center group">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative z-10 w-24 h-24 rounded-3xl border-2 flex flex-col items-center justify-center transition-all duration-700 bg-slate-900/90 backdrop-blur-2xl ${
          isActive ? `border-${color}` : 
          isComplete ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 
          'border-slate-800'
        }`}
        style={isActive ? { boxShadow: `0 0 30px 2px var(--color-${color})` } : {}}
      >
        <div className={`transition-all duration-500 ${isActive ? `text-${color} scale-110` : isComplete ? 'text-emerald-500' : 'text-slate-600'}`}>
          {isComplete ? <CheckCircle2 size={36} /> : icon}
        </div>
        
        {isActive && (
          <motion.div
            className={`absolute -inset-2 rounded-[2rem] border-2 border-${color} opacity-20`}
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      <div className="mt-5 text-center">
        <div className="text-sm font-bold text-white font-serif tracking-wide">{label}</div>
        <div className={`text-[10px] font-mono uppercase tracking-[0.2em] mt-1.5 transition-colors duration-500 ${isActive ? `text-${color}` : isComplete ? 'text-emerald-500' : 'text-slate-600'}`}>
          {status}
        </div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-full mt-6 w-64 p-4 bg-slate-900/95 border border-slate-700/50 rounded-2xl shadow-2xl z-[100] backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 mb-3 text-cyan-400">
              <Info size={14} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Node Diagnostics</span>
            </div>
            <div className="space-y-2">
              {diagnostics.map((d, i) => (
                <div key={i} className="flex gap-2 text-[10px] font-mono text-slate-300 leading-relaxed">
                  <span className="text-slate-600 shrink-0">[{i+1}]</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AgentFlowVisualizer: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [riskCounter, setRiskCounter] = useState(0);

  const logs = [
    "Initializing Coral MCP Clients...",
    "Authenticating GitHub/Linear/Slack...",
    "Parallel Harvesting: Fetching GitHub repo dependencies...",
    "Parallel Harvesting: Mapping Linear service ownership...",
    "Parallel Harvesting: Querying Slack on-call roster...",
    "Executing Unified SQL JOIN (github ↔ linear ↔ slack)...",
    "Resolving Cross-Source Schema Mappings...",
    "AI Orchestrator: Calculating Vulnerability Risk Score...",
    "AI Orchestrator: Synthesizing Remediation Strategy...",
    "Resolution Complete. Transitioning to Handoff."
  ];

  useEffect(() => {
    // 10 second timeline
    const phaseTimers = [
      setTimeout(() => setPhase(1), 0),    // Initialization
      setTimeout(() => setPhase(2), 2000), // Harvesting
      setTimeout(() => setPhase(3), 5000), // JOIN
      setTimeout(() => setPhase(4), 7000), // Synthesis
      setTimeout(() => setPhase(5), 9000), // Complete
      setTimeout(() => onComplete(), 10000),
    ];

    // Log update interval
    const logInterval = setInterval(() => {
      setLogIndex(prev => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 1000);

    return () => {
      phaseTimers.forEach(t => clearTimeout(t));
      clearInterval(logInterval);
    };
  }, [onComplete]);

  // Risk score counter effect during phase 4
  useEffect(() => {
    if (phase === 4) {
      const interval = setInterval(() => {
        setRiskCounter(prev => (prev < 9.8 ? parseFloat((prev + 0.4).toFixed(1)) : 9.8));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <div className="w-full max-w-6xl mx-auto py-20 relative font-sans">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* SVG Background Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <FlowLine from="github" to="coral" active={phase >= 2 && phase < 4} />
        <FlowLine from="linear" to="coral" active={phase >= 2 && phase < 4} />
        <FlowLine from="slack" to="coral" active={phase >= 2 && phase < 4} />
        <FlowLine from="coral" to="llm" active={phase >= 4 && phase < 5} />
      </svg>

      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-12 items-center px-4">
        <AgentNode
          id="github"
          icon={<GitBranch size={32} />}
          label="Code Scanner"
          status={phase >= 2 ? (phase === 2 ? "Harvesting..." : "Data Cached") : "Waiting"}
          color="github"
          isActive={phase === 2}
          isComplete={phase > 2}
          diagnostics={["Scanning 14 repositories...", "Found log4j-core v2.14.1", "Identified 3 potential entry points"]}
        />
        <AgentNode
          id="linear"
          icon={<Ticket size={32} />}
          label="Ownership"
          status={phase >= 2 ? (phase === 2 ? "Resolving..." : "Owner Mapped") : "Waiting"}
          color="linear"
          isActive={phase === 2}
          isComplete={phase > 2}
          diagnostics={["Mapping Linear service tags...", "Owner: @Alice Chen", "SLA Tier: Tier-1 (4h)"]}
        />
        <AgentNode
          id="slack"
          icon={<MessageSquare size={32} />}
          label="Context Fetcher"
          status={phase >= 2 ? (phase === 2 ? "Fetching..." : "Context Unified") : "Waiting"}
          color="slack"
          isActive={phase === 2}
          isComplete={phase > 2}
          diagnostics={["Polling Slack API...", "Channel: #eng-auth-oncall", "Context: Active maintenance window"]}
        />
        <AgentNode
          id="coral"
          icon={<Database size={44} />}
          label="Coral JOIN Engine"
          status={phase === 3 ? "JOINING..." : phase > 3 ? "Schema Unified" : "Idle"}
          color="coral"
          isActive={phase === 3}
          isComplete={phase > 3}
          diagnostics={[
            "Executing Cross-Source JOIN...",
            "Mapping gh.repo_id ↔ lin.svc_tag...",
            "Unified Resultset: 142 records"
          ]}
        />
        <AgentNode
          id="llm"
          icon={<Sparkles size={32} />}
          label="AI Synthesis"
          status={phase === 4 ? `Risk: ${riskCounter}` : phase > 4 ? "Action Ready" : "Waiting"}
          color="llm"
          isActive={phase === 4}
          isComplete={phase > 4}
          diagnostics={[
            "Calculating exploitability vectors...",
            "Synthesizing remediation steps...",
            `Risk Score Confidence: 98%`
          ]}
        />
      </div>

      {/* Central Flowing SQL Code Visual (Phase 3) */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 mt-20 p-4 bg-black/80 border border-cyan-500/30 rounded-lg font-mono text-[10px] text-cyan-400 z-50 shadow-2xl w-full max-w-sm"
          >
            <div className="flex items-center gap-2 mb-2 border-b border-cyan-500/20 pb-2 uppercase tracking-widest text-slate-500">
              <TerminalIcon size={12} />
              Unified JOIN Execution
            </div>
            <div className="space-y-1">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>SELECT gh.repo, lin.owner FROM github_deps gh</motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>INNER JOIN linear_tickets lin ON gh.repo = lin.svc</motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>WHERE gh.package = 'log4j' AND lin.priority = 1;</motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Technical Console */}
      <div className="mt-28 w-full max-w-3xl mx-auto px-6">
        <div className="bg-black/80 rounded-2xl border border-slate-800 p-6 font-mono relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-pulse" />
          <div className="flex items-center justify-between mb-4 border-b border-slate-900 pb-3">
             <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500/50" />
                <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
             </div>
             <span className="text-[10px] text-slate-500 uppercase tracking-[0.3em]">Orchestration Terminal</span>
             <span className="text-[10px] text-cyan-500/70 font-bold uppercase">{Math.round((phase/5)*100)}%</span>
          </div>
          
          <div className="space-y-2 h-24 overflow-hidden">
            {logs.slice(0, logIndex + 1).map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 text-xs"
              >
                <span className="text-slate-700 w-16">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                <span className={i === logIndex ? "text-emerald-400 font-bold" : "text-slate-500"}>
                  {log}
                </span>
                {i === logIndex && phase < 5 && <span className="w-2 h-4 bg-emerald-500 animate-pulse" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FlowLine = ({ from, to, active }: { from: string; to: string; active: boolean }) => {
  const coords: Record<string, { x: string; y: string }> = {
    github: { x: '10%', y: '50%' },
    linear: { x: '30%', y: '50%' },
    slack: { x: '50%', y: '50%' },
    coral: { x: '70%', y: '50%' },
    llm: { x: '90%', y: '50%' },
  };

  return (
    <g>
      <motion.path
        d={`M ${coords[from].x} ${coords[from].y} L ${coords[to].x} ${coords[to].y}`}
        stroke={active ? "rgba(6, 182, 212, 0.4)" : "rgba(30, 41, 59, 0.3)"}
        strokeWidth="3"
        fill="none"
        transition={{ duration: 0.5 }}
      />
      {active && (
        <motion.path
          d={`M ${coords[from].x} ${coords[from].y} L ${coords[to].x} ${coords[to].y}`}
          stroke="#06B6D4"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10,20"
          animate={{ strokeDashoffset: [-60, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </g>
  );
};
