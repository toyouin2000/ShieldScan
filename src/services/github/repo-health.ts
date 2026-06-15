export async function scanRepoHealth(
  owner: string,
  repo: string
) {
  const files = [
    "README.md",
    "LICENSE",
    "SECURITY.md",
    ".gitignore",
  ];

  const findings = [];

  for (
    const file of files
  ) {
    const response =
      await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${file}`
      );

    if (!response.ok) {
      findings.push({
        title:
          `Missing ${file}`,
        severity: "low",
        description:
          `${file} was not found.`,
      });
    }
  }

  return findings;
}