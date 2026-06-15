export interface Finding {
  title: string;
  severity:
    | "critical"
    | "high"
    | "medium"
    | "low";

  description: string;
}

export interface ReportData {
  score: number;
  findings: Finding[];
}