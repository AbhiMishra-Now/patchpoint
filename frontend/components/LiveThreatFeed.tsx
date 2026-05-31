import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldAlert, Activity, Wifi } from 'lucide-react';

interface SecurityEvent {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'critical';
}

const EVENT_TEMPLATES: { message: string, type: 'info' | 'warning' | 'critical' }[] = [
  { message: "Scanning repo 'payment-gateway'... [OK]", type: 'info' },
  { message: "Found deprecated package 'lodash@4.17.19' in 'user-service'", type: 'warning' },
  { message: "Resolving owner for 'auth-api' via Linear MCP... [Alice Chen]", type: 'info' },
  { message: "Checking Slack on-call roster for #eng-backend... [Found: @Bob]", type: 'info' },
  { message: "CVE-2024-1024 detected in 'frontend-app'. Risk: 7.2", type: 'warning' },
  { message: "CRITICAL: Exploit attempt detected on 'auth-service' [BLOCKED]", type: 'critical' },
  { message: "Syncing github_dependencies with Notion SLA database...", type: 'info' },
  { message: "Patch verified for 'data-pipeline' (SEC-991). Status: Patched.", type: 'info' },
  { message: "Cache refreshed for Tier-1 service dependency graph.", type: 'info' },
  { message: "Unauthorized version mismatch in 'edge-proxy'. Alerting @Security.", type: 'critical' },
];

export const LiveThreatFeed: React.FC = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const generateRandomEvent = () => {
    const template = EVENT_TEMPLATES[Math.floor(Math.random() * EVENT_TEMPLATES.length)];
    const newEvent: SecurityEvent = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      ...template
    };
    setEvents(prev => [...prev.slice(-9), newEvent]);
  };

  useEffect(() => {
    // Initial events
    for (let i = 0; i < 3; i++) {
        setTimeout(generateRandomEvent, i * 500);
    }

    const interval = setInterval(generateRandomEvent, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[400px] w-full lg:w-80 shrink-0">
      <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-rose-500 animate-ping opacity-75" />
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">Live Threat Monitor</span>
        </div>
        <Wifi size={12} className="text-emerald-500 animate-pulse" />
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-2 font-mono text-[10px] scroll-smooth custom-scrollbar bg-black/40"
      >
        <AnimatePresence initial={false}>
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              className={`flex gap-3 py-1 border-b border-slate-900/50 last:border-0 ${
                event.type === 'critical' ? 'text-rose-500 bg-rose-500/5' : 
                event.type === 'warning' ? 'text-amber-400' : 
                'text-slate-400'
              }`}
            >
              <span className="text-slate-700 shrink-0">[{event.timestamp}]</span>
              <span className="flex-1 leading-relaxed">
                {event.type === 'critical' && <ShieldAlert size={10} className="inline mr-1" />}
                {event.type === 'info' && <Activity size={10} className="inline mr-1 opacity-50" />}
                {event.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="px-4 py-2 border-t border-slate-900 bg-slate-900/30 flex items-center justify-between text-[8px] font-mono text-slate-600 uppercase tracking-tighter">
        <div className="flex items-center gap-2">
          <Terminal size={10} />
          <span>Coral Engine Background Worker v1.2.0</span>
        </div>
        <span>Active</span>
      </div>
    </div>
  );
};
