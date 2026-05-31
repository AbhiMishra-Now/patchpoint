import React from 'react';
import { Shield } from 'lucide-react';

interface FooterProps {
  onLaunch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLaunch }) => {
  return (
    <footer className="bg-slate-900 pt-24 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              Secure your stack. <br />
              <span className="text-cyan-500">Declaratively.</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-md">
              Join the waitlist or launch the sandbox now to experience unified security intelligence.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={onLaunch}
                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                Launch Demo Sandbox
              </button>
              <button 
                className="px-8 py-4 bg-slate-800 border border-slate-700 hover:border-slate-600 text-white rounded-xl font-bold transition-all"
              >
                Contact Sales
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Sandbox</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-800 gap-8">
          <div className="flex items-center gap-2">
            <Shield className="text-cyan-500" size={20} />
            <span className="text-xl font-serif font-bold text-white tracking-tight">PatchPoint</span>
          </div>
          <div className="text-slate-500 text-xs font-mono uppercase tracking-widest">
            © 2026 PATCHPOINT SECURITY SYSTEMS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6 text-slate-400 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
