import { fetchRepoContents } from "./github-client";
import { getFileContent } from "./file-content";

import {
  SECRET_PATTERNS,
} from "@/constants/secret-patterns";

import {
  extractAssignments,
} from "@/utils/extract-secrets";

import {
  looksLikeSecret,
} from "@/utils/entropy";

import {
  reviewSecret,
} from "@/services/ai/review-secret";

export async function scanSecrets(
  owner: string,
  repo: string
) {
  const findings: any[] = [];

  try {
    const files = await fetchRepoContents(
      owner,
      repo
    );

    console.log(
      "Repository Files:",
      files.map((f: any) => f.name)
    );

    const candidateFiles = files.filter(
      (file: any) =>
        file.name.endsWith(".env") ||
        file.name.endsWith(".js") ||
        file.name.endsWith(".ts") ||
        (file.name.endsWith(".json") &&
  !file.name.includes("lock")) ||
        file.name.includes("config")
    );

    console.log(
      "Files Selected For Scanning:",
      candidateFiles.map(
        (f: any) => f.name
      )
    );

    const aiCandidates: any[] = [];

    for (const file of candidateFiles) {
      if (!file.download_url) continue;

      console.log(
        "Scanning File:",
        file.name
      );

      const content =
        await getFileContent(
          file.download_url
        );

      // -------------------------
      // Regex Detection
      // -------------------------

      for (const pattern of SECRET_PATTERNS) {
        const regex = new RegExp(
          pattern.regex.source,
          pattern.regex.flags
        );

        if (regex.test(content)) {
          console.log(
            "Regex Match:",
            pattern.name,
            file.name
          );

          findings.push({
            title:
              `${pattern.name} Detected`,
            severity: "critical",
            description:
              `Known secret signature found in ${file.name}`,
          });
        }
      }

      // -------------------------
      // Entropy Detection
      // -------------------------

      const assignments =
        extractAssignments(
          content
        );

      console.log(
        "Assignments Found:",
        assignments
      );

      for (const item of assignments) {
        const analysis =
          looksLikeSecret(
            item.variable,
            item.value
          );

        console.log(
          "Variable:",
          item.variable,
          "Entropy:",
          analysis.entropy,
          "Suspicious:",
          analysis.suspicious
        );

        if (
          analysis.suspicious
        ) {
          aiCandidates.push({
            ...item,
            entropy:
              analysis.entropy,
          });
        }
      }
    }

    // -------------------------
    // AI Review
    // Max 3 Calls
    // -------------------------

    const topCandidates =
      aiCandidates.slice(0, 3);

    for (const candidate of topCandidates) {
      try {
        const aiReview =
          await reviewSecret(
            candidate.variable,
            candidate.value
          );

        findings.push({
          title:
            "Potential Secret Detected",

          severity: "high",

          description:
            `Variable: ${candidate.variable}

Entropy Score:
${candidate.entropy.toFixed(
  2
)}

AI Analysis:
${aiReview}`,
        });
      } catch (error) {
        console.error(
          "AI Review Failed",
          error
        );
      }
    }

    console.log(
      "Final Findings:",
      findings
    );

    return findings;
  } catch (error) {
    console.error(
      "Secret Scan Error",
      error
    );

    return [];
  }
}