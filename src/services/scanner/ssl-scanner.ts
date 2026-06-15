import { Finding } from "@/types/scan";

export async function scanSSL(
  url: string
): Promise<Finding[]> {
  const findings: Finding[] = [];

  if (!url.startsWith("https://")) {
    findings.push({
      title: "SSL Not Enabled",
      severity: "high",
      description:
        "Website is not using HTTPS.",
    });
  }

  return findings;
}