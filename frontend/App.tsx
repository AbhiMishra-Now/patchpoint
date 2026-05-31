import { useState, useEffect } from 'react';
import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { ArchitectureVisualizer } from './components/landing/ArchitectureVisualizer';
import { Problem } from './components/landing/Problem';
import { DemoPreview } from './components/landing/DemoPreview';
import { Features } from './components/landing/Features';
import { Footer } from './components/landing/Footer';

import { Header } from './components/Header';
import { NLQueryBar } from './components/NLQueryBar';
import { RiskDashboard } from './components/RiskDashboard';
import { ImpactMatrix } from './components/ImpactMatrix';
import { AISynthesisPanel } from './components/AISynthesisPanel';
import { SQLViewer } from './components/SQLViewer';
import { Toaster } from 'sonner';
import { runPatchPointQuery } from './lib/patchpointService';
import { CoralQueryResult } from './lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { AgentFlowVisualizer } from './components/AgentFlowVisualizer';
import { LiveThreatFeed } from './components/LiveThreatFeed';

function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [appState, setAppState] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [data, setData] = useState<CoralQueryResult | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleQuery = async (input: string) => {
    setIsLoading(true);
    setAppState('processing');
    setData(null);
    setLogs([]);

    try {
      // 1. Trigger the background query immediately
      const result = await runPatchPointQuery(input);
      setData(result);
      
      // We don't finish loading/processing here anymore. 
      // The Visualizer will call onVisualizerComplete after 10s.
    } catch (error) {
      console.error("Workflow failed:", error);
      setAppState('idle');
      setIsLoading(false);
    }
  };

  const onVisualizerComplete = () => {
    setAppState('complete');
    setIsLoading(false);
  };

  const handleReset = () => {
    setData(null);
    setLogs([]);
    setIsLoading(false);
    setAppState('idle');
  };

  if (view === 'landing') {
    return (
      <div className="bg-slate-950 min-h-screen selection:bg-cyan-500/30 overflow-x-hidden font-sans">
        <Navbar onLaunch={() => setView('dashboard')} />
        <Hero onLaunch={() => setView('dashboard')} />
        <ArchitectureVisualizer />
        <Problem />
        <DemoPreview />
        <Features />
        <Footer onLaunch={() => setView('dashboard')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-gradient selection:bg-cyan-500/30 font-sans">
      <Header 
        latency={data?.latency_ms} 
        apiSaved={data?.api_calls_saved} 
        cacheHit={data?.cache_hit}
        source={(data as any)?.source}
      />
      
      <main className="max-w-[1600px] mx-auto px-8 py-12 space-y-12">
        <div className="flex items-center justify-between">
           <button 
            onClick={() => setView('landing')}
            className="text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest flex items-center gap-2"
          >
            &larr; Exit to Landing
          </button>
          
          {data && (
            <button 
              onClick={handleReset}
              className="text-xs font-mono text-slate-500 hover:text-rose-400 transition-colors uppercase tracking-widest flex items-center gap-2"
            >
              <RotateCcw size={12} />
              Reset Dashboard
            </button>
          )}
        </div>

        <section className="space-y-6">
          <div className="text-center space-y-2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-serif font-bold tracking-tight text-white"
            >
              Security Impact Mapper
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg max-w-2xl mx-auto"
            >
              Unified vulnerability intelligence powered by Coral SQL. 
              Join data across GitHub, Linear, and Slack in real-time.
            </motion.p>
          </div>

          <NLQueryBar 
            onQuery={handleQuery} 
            isLoading={isLoading} 
            logs={logs} 
          />
        </section>

        <AnimatePresence mode="wait">
          {appState === 'processing' && (
            <motion.div
              key="visualizer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AgentFlowVisualizer onComplete={onVisualizerComplete} />
            </motion.div>
          )}

          {appState === 'complete' && data && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <RiskDashboard />

              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-12">
                  {/* Vulnerability Impact Matrix */}
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <div className="w-2 h-6 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                        Vulnerability Impact Matrix
                      </h3>
                      <div className="text-xs font-mono text-slate-500">
                        Showing {data.results.length} active resolutions
                      </div>
                    </div>
                    <ImpactMatrix data={data.results} />
                  </div>

                  {/* Action Intelligence */}
                  <div className="space-y-8">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <div className="w-2 h-6 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                      Action Intelligence
                    </h3>
                    <AISynthesisPanel data={data} />
                  </div>

                  {/* SQL Execution Plan */}
                  <SQLViewer 
                    sql={data.sql} 
                    logs={data.schema_mapping_log} 
                    source={(data as any).source}
                  />
                </div>

                {/* Live Threat Feed Sidebar */}
                <LiveThreatFeed />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {appState === 'idle' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="flex flex-col items-center justify-center py-20 text-slate-500 gap-4"
          >
            <div className="w-16 h-16 rounded-full border border-slate-800 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>
            <p className="font-mono text-sm uppercase tracking-widest">Enter a query to start resolution</p>
          </motion.div>
        )}
      </main>

      <Toaster position="bottom-right" theme="dark" richColors />
    </div>
  );
}

export default App;
