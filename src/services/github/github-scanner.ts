import { scanRepoHealth } from "./repo-health";
import { scanDependencies } from "./dependency-scanner";
import { scanSecrets } from "./secret-scanner";

export async function scanGithubRepo(
  owner: string,
  repo: string
) {
  const health = await scanRepoHealth(
    owner,
    repo
  );

  const deps = await scanDependencies(
    owner,
    repo
  );

  const secrets = await scanSecrets(
    owner,
    repo
  );

  const findings = [
    ...health,
    ...deps,
    ...secrets,
  ];

  let score = 100;

  findings.forEach((finding) => {
    switch (finding.severity) {
  case "critical":
    score -= 25;
    break;

  case "high":
    score -= 15;
    break;

  case "medium":
    score -= 10;
    break;

  case "low":
    score -= 5;
    break;
}
  });

  score = Math.max(score, 0);

  const grade =
    score >= 90
      ? "A"
      : score >= 80
      ? "B"
      : score >= 70
      ? "C"
      : score >= 60
      ? "D"
      : "F";

  const severityBreakdown = {
    critical: findings.filter(
      (f) => f.severity === "critical"
    ).length,

    high: findings.filter(
      (f) => f.severity === "high"
    ).length,

    medium: findings.filter(
      (f) => f.severity === "medium"
    ).length,

    low: findings.filter(
      (f) => f.severity === "low"
    ).length,
  };

  return {
    score,
    grade,
    findings,
    summary: {
      totalFindings: findings.length,
      ...severityBreakdown,
    },
  };
}