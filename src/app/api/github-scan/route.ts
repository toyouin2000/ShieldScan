import { NextRequest }
  from "next/server";

import {
  scanGithubRepo,
} from "@/services/github/github-scanner";

import {
  parseGithubUrl,
} from "@/utils/parse-github";

export async function POST(
  request: NextRequest
) {
  const body =
    await request.json();

  const {
    owner,
    repo,
  } = parseGithubUrl(
    body.url
  );

  const result =
    await scanGithubRepo(
      owner,
      repo
    );

  return Response.json(
    result
  );
}