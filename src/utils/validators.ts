export function isValidWebsite(
  value: string
) {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}

export function isValidGithubRepo(
  value: string
) {
  const githubRegex =
    /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/i;

  return githubRegex.test(
    value.trim()
  );
}