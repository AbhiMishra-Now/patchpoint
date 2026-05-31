import React, { useEffect, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingUp, Clock } from 'lucide-react';
import { useLiveMetrics } from '../hooks/useLiveMetrics';

const sparklineData = Array.from({ length: 10 }, (_) => ({ value: Math.floor(Math.random() * 50) + 20 }));

export const RiskDashboard: React.FC = () => {
  const { criticalCount, avgRiskScore, mttrReduction, lastUpdate } = useLiveMetrics();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/10">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-cyan-500/70 uppercase tracking-widest">Live Metrics Engine Active</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard
          icon={<AlertCircle className="text-rose-500" size={20} />}
          label="Critical Vulnerabilities"
          value={criticalCount.toString()}
          trend="+12% from last scan"
          color="rose"
          chartData={sparklineData}
          lastUpdate={lastUpdate.critical}
        />
        <KPICard
          icon={<TrendingUp className="text-amber-500" size={20} />}
          label="Avg Risk Score"
          value={avgRiskScore.toFixed(1)}
          trend="Decreasing"
          color="amber"
          chartData={sparklineData.map(d => ({ value: d.value * 0.8 }))}
          lastUpdate={lastUpdate.risk}
        />
        <KPICard
          icon={<Clock className="text-cyan-500" size={20} />}
          label="Est. MTTR Reduction"
          value={`${mttrReduction}%`}
          trend="Coral Optimized"
          color="cyan"
          chartData={sparklineData.map(d => ({ value: d.value * 0.5 }))}
          lastUpdate={lastUpdate.mttr}
        />
      </div>
    </div>
  );
};

const KPICard = ({ icon, label, value, trend, color, chartData, lastUpdate }: { 
  icon: React.ReactNode, 
  label: string, 
  value: string, 
  trend: string, 
  color: 'rose' | 'amber' | 'cyan', 
  chartData: any[],
  lastUpdate?: number
}) => {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (lastUpdate) {
      setIsFlashing(true);
      const timer = setTimeout(() => setIsFlashing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [lastUpdate]);

  const colors = {
    rose: "shadow-[0_0_20px_rgba(244,63,94,0.1)] border-rose-500/20 text-rose-500",
    amber: "shadow-[0_0_20px_rgba(245,158,11,0.1)] border-amber-500/20 text-amber-500",
    cyan: "shadow-[0_0_20px_rgba(6,182,212,0.1)] border-cyan-500/20 text-cyan-500",
  };

  const areaColors = {
    rose: "#F43F5E",
    amber: "#F59E0B",
    cyan: "#06B6D4",
  };

  return (
    <div className={`bg-slate-900/60 backdrop-blur-md border rounded-xl p-5 flex flex-col justify-between h-40 group hover:bg-slate-900/80 transition-all ${colors[color]}`}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2 opacity-80">
            {icon}
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">{label}</span>
          </div>
          <div className={`text-3xl font-bold tracking-tight transition-colors duration-500 ${isFlashing ? 'text-white scale-105' : 'text-slate-100'}`}>
            {value}
          </div>
        </div>
        <div className="w-20 h-12 opacity-50 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={areaColors[color]} 
                fill={areaColors[color]} 
                fillOpacity={0.1} 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="text-[10px] font-mono opacity-50 flex items-center gap-1">
        <span className="w-1 h-1 rounded-full bg-current" />
        {trend}
      </div>
    </div>
  );
};
