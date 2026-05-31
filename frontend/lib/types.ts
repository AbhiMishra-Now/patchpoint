export interface CoralResultRow {
  repo: string;
  package: string;
  version: string;
  owner: string;
  slack: string;
  risk: number;
  sla: "Tier-1" | "Tier-2" | "Tier-3";
  linear_ticket?: string;
}

export interface CoralQueryResult {
  sql: string;
  latency_ms: number;
  api_calls_saved: number;
  results: CoralResultRow[];
  cache_hit: boolean;
  schema_mapping_log: string[];
  slack_draft?: string;
}

export interface ActionPlan {
  slackDraft: string;
  confidence: number;
  reasoning: string;
}
