export type FindingSeverity =
  | "critical"
  | "high"
  | "medium"
  | "low";

export interface Finding {
  title: string;
  severity: FindingSeverity;
  description: string;
}

export interface ScanResult {
  score: number;
  findings: Finding[];
}