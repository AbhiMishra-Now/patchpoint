import { useState, useEffect } from 'react';

export const useLiveMetrics = () => {
  const [criticalCount, setCriticalCount] = useState(12);
  const [avgRiskScore, setAvgRiskScore] = useState(8.4);
  const [mttrReduction, setMttrReduction] = useState(42.5);
  
  // Track last updates for flash animations
  const [lastUpdate, setLastUpdate] = useState<{ [key: string]: number }>({});

  const triggerFlash = (key: string) => {
    setLastUpdate(prev => ({ ...prev, [key]: Date.now() }));
  };

  useEffect(() => {
    // 1. Critical Count Simulation (Step-wise, every 12-20s)
    const critInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCriticalCount(prev => {
          const change = Math.random() > 0.5 ? 1 : -1;
          const next = Math.max(0, prev + change);
          if (next !== prev) triggerFlash('critical');
          return next;
        });
      }
    }, 15000);

    // 2. Avg Risk Score Simulation (Noisy, every 4-6s)
    const riskInterval = setInterval(() => {
      setAvgRiskScore(prev => {
        const jitter = (Math.random() - 0.5) * 0.1;
        const next = Math.min(10, Math.max(0, prev + jitter));
        triggerFlash('risk');
        return parseFloat(next.toFixed(1));
      });
    }, 5000);

    // 3. MTTR Reduction (Upward trend, every 8s)
    const mttrInterval = setInterval(() => {
      setMttrReduction(prev => {
        if (prev < 95) {
          const increment = Math.random() * 0.05;
          triggerFlash('mttr');
          return parseFloat((prev + increment).toFixed(1));
        }
        return prev;
      });
    }, 8000);

    return () => {
      clearInterval(critInterval);
      clearInterval(riskInterval);
      clearInterval(mttrInterval);
    };
  }, []);

  return { criticalCount, avgRiskScore, mttrReduction, lastUpdate };
};
