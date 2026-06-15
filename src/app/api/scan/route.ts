import { NextRequest } from "next/server";

import { scanWebsite }
  from "@/services/scanner/website-scanner";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const result =
      await scanWebsite(body.url);

    return Response.json(result);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Scan failed",
      },
      {
        status: 500,
      }
    );
  }
}