import {
  fetchRepoContents,
} from "./github-client";

import {
  getFileContent,
} from "./file-content";

import {
  parseDependencies,
} from "./package-parser";

import {
  reviewDependencies,
} from "@/services/ai/dependency-review";

export async function scanDependencies(
  owner: string,
  repo: string
) {
  const findings: any[] = [];

  try {
    const packageFile =
      await fetchRepoContents(
        owner,
        repo,
        "package.json"
      );

    if (!packageFile.download_url) {
      return findings;
    }

    const content =
      await getFileContent(
        packageFile.download_url
      );

    const packageJson =
      JSON.parse(content);

    const dependencies =
      parseDependencies(
        packageJson
      );

    console.log(
      "Dependencies Found:",
      dependencies
    );

    if (
      dependencies.length === 0
    ) {
      return findings;
    }

    const limitedDeps =
      dependencies.slice(
        0,
        25
      );

    console.log(
      `Analyzing ${limitedDeps.length} dependencies`
    );

    const aiResponse =
      await reviewDependencies(
        limitedDeps
      );
       

    if (!aiResponse) {
      findings.push({
        title:
          "Dependency Analysis Failed",
        severity: "low",
        description:
          "AI dependency analysis could not be completed.",
      });

      return findings;
    }

    let parsedResponse;

    try {
      const cleaned =
        aiResponse
          .replace(
            /```json/g,
            ""
          )
          .replace(
            /```/g,
            ""
          )
          .trim();

      parsedResponse =
        JSON.parse(
          cleaned
        );
        
    } catch (error) {
      console.error(
        "Failed to parse AI response",
        aiResponse
      );

      findings.push({
        title:
          "Dependency Analysis Error",
        severity: "low",
        description:
          "Unable to process AI dependency review.",
      });

      return findings;
    }
    // console.log(parsedResponse,"asdas");

    let reviews: any[] = [];

    if (
      Array.isArray(parsedResponse)
    ) {
      reviews = parsedResponse;
    } else if (
      Array.isArray(
        parsedResponse.dependencies
      )
    ) {
      reviews =
        parsedResponse.dependencies;
    } else if (
      Array.isArray(
        parsedResponse.findings
      )
    ) {
      reviews =
        parsedResponse.findings;
    }

    console.log(
      "Parsed Dependency Reviews:",
      reviews
    );

    const allowedSeverities = [
      "critical",
      "high",
      "medium",
      "low",
    ];

    
    for (const review of reviews) {
      findings.push({
        title:
          `${review.package} Dependency Risk`,

        severity:
          review.severity ||
          "medium",

        description:
          `${review.reason}

Recommendation:
${review.recommendation}`,
      });
    }

    console.log(
  "Dependency Findings:",
  findings
);

return findings;
  } catch (error) {
    console.error(
      "Dependency Scanner Error",
      error
    );

    findings.push({
      title:
        "Dependency Scanner Error",
      severity: "low",
      description:
        "Unable to analyze repository dependencies.",
    });

    return findings;
  }
}


