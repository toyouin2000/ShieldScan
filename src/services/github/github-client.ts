const BASE_URL =
  "https://api.github.com";

const headers = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

export async function fetchRepo(
  owner: string,
  repo: string
) {
  const response = await fetch(
    `${BASE_URL}/repos/${owner}/${repo}`,
    {
      headers,
    }
  );

  console.log(
    "Rate Limit Remaining:",
    response.headers.get(
      "x-ratelimit-remaining"
    )
  );

  if (!response.ok) {
    const text =
      await response.text();

    console.error(
      "GitHub Repo Error:",
      text
    );

    throw new Error(
      `Repository not found (${response.status})`
    );
  }

  return response.json();
}

export async function fetchRepoContents(
  owner: string,
  repo: string,
  path = ""
) {
  const response = await fetch(
    `${BASE_URL}/repos/${owner}/${repo}/contents/${path}`,
    {
      headers,
    }
  );

  console.log(
    "Rate Limit Remaining:",
    response.headers.get(
      "x-ratelimit-remaining"
    )
  );

  if (!response.ok) {
    const text =
      await response.text();

    console.error(
      "GitHub Contents Error:",
      text
    );

    throw new Error(
      `GitHub API Error ${response.status}`
    );
  }

  return response.json();
}