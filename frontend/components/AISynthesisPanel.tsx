import React, { useState, useEffect } from 'react';
import { CoralQueryResult } from '../lib/types';
import { MessageSquare, Copy, Check, Send, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface AISynthesisPanelProps {
  data: CoralQueryResult | null;
}

const useTypewriter = (text: string, speed: number = 30) => {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsDone(false);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setIsDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayText, isDone };
};

export const AISynthesisPanel: React.FC<AISynthesisPanelProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [posted, setPosted] = useState(false);

  if (!data || data.results.length === 0) return null;

  const topVuln = data.results.sort((a, b) => b.risk - a.risk)[0];
  const draft = data.slack_draft || `@${topVuln.owner} ⚠️ Critical CVE in ${topVuln.repo}. Risk: ${topVuln.risk}. Please triage ${topVuln.linear_ticket || 'ticket'}.`;
  
  const { displayText } = useTypewriter(draft);

  const handleCopy = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    toast.success("Slack draft copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePost = () => {
    setPosted(true);
    toast.success("Dispatched to Slack #security-ops");
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
            <MessageSquare className="text-cyan-500" size={18} />
          </div>
          <h2 className="text-lg font-bold text-white">Slack Message Draft</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
          <Sparkles className="text-purple-400" size={12} />
          <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
            AI GENERATED
          </span>
        </div>
      </div>

      <div className="relative group">
        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-sm text-slate-300 min-h-[100px] flex flex-col justify-between">
          <div className="whitespace-pre-wrap leading-relaxed">
            {displayText}
            <span className="w-2 h-4 bg-cyan-500 inline-block animate-pulse ml-1 align-middle" />
          </div>
          <div className="pt-4 flex items-center gap-2 text-[10px] text-slate-500 border-t border-slate-900 mt-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Destination: {topVuln.slack}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button 
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg font-bold transition-all border border-slate-700 active:scale-95"
        >
          {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
          Copy to Clipboard
        </button>
        <button 
          onClick={handlePost}
          disabled={posted}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] active:scale-95 ${posted ? 'bg-emerald-600/20 text-emerald-500 border border-emerald-500/20' : 'bg-cyan-600 hover:bg-cyan-500 text-white'}`}
        >
          {posted ? <><Check size={16} /> Posted ✅</> : <><Send size={16} /> Post to Slack</>}
        </button>
      </div>
    </div>
  );
};
