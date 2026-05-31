import { CoralQueryResult } from './types';

// HIGH-FIDELITY MOCK DATA (Safety Net)
const LOCAL_MOCK_DATA: CoralQueryResult & { source: string; logs: string[] } = {
  source: 'LOCAL_SIMULATION',
  latency_ms: 420,
  api_calls_saved: 14,
  cache_hit: true,
  logs: [
    "[Frontend] Backend Service Unavailable.",
    "[Frontend] Activating Local Simulation Engine...",
    "[Engine] Simulating Cross-Source JOIN...",
    "[Engine] Loading Curated Incident Scenario (Log4j)...",
    "[Engine] Resolution Complete."
  ],
  schema_mapping_log: [
    "Resolution resolved via Local Cache",
    "Source: Local Simulation Engine"
  ],
  sql: "SELECT gh.repo, lin.owner FROM github_dependencies gh JOIN linear_tickets lin ON gh.repo = lin.service WHERE gh.package = 'log4j-core';",
  results: [
    {
      repo: "auth-service",
      package: "log4j-core",
      version: "2.14.1",
      owner: "Alice Chen",
      slack: "#eng-auth-oncall",
      risk: 9.8,
      sla: "Tier-1",
      linear_ticket: "LIN-402"
    },
    {
      repo: "payment-gateway",
      package: "lodash",
      version: "4.17.19",
      owner: "Bob Smith",
      slack: "#eng-backend",
      risk: 7.2,
      sla: "Tier-2",
      linear_ticket: "PAY-882"
    }
  ]
};

export interface PatchPointResult extends CoralQueryResult {
  source: string;
  logs: string[];
}

export async function runPatchPointQuery(query: string): Promise<PatchPointResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5s timeout for local dev

    const response = await fetch('http://localhost:5000/api/coral-query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error('Backend Error');
    const result = await response.json();
    return result as PatchPointResult;

  } catch (error) {
    console.warn("⚠️ PatchPoint Backend unavailable. Using Local Mocks.", error);
    // Simulate a brief delay to show the orchestration visualizer
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create a modified copy of mock data with the user's query logged
    return { 
      ...LOCAL_MOCK_DATA, 
      logs: [...LOCAL_MOCK_DATA.logs, `Query: "${query}"`] 
    };
  }
}
