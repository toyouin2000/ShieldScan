export function parseGithubUrl(
  url: string
) {
  const parts =
    url.split("/");

  const owner =
    parts[3];

  const repo =
    parts[4];

  return {
    owner,
    repo,
  };
}