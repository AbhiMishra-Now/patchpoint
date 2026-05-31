import React from 'react';
import { Shield } from 'lucide-react';

interface NavbarProps {
  onLaunch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLaunch }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Shield className="text-cyan-500" size={28} />
          <span className="text-2xl font-serif font-bold text-white tracking-tight">PatchPoint</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#problem">How it Works</NavLink>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#security">Security</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onLaunch}
            className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500 rounded-lg transition-all"
          >
            Open Desk
          </button>
          <button 
            onClick={onLaunch}
            className="px-5 py-2 text-sm font-bold bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            Launch Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">
    {children}
  </a>
);
