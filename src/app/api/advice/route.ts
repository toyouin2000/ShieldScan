import { NextRequest } from "next/server";

import {
  generateAdvice,
} from "@/services/ai/security-advisor";

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    const advice =
      await generateAdvice(
        body.issue
      );

    return Response.json({
      advice,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to generate recommendation",
      },
      {
        status: 500,
      }
    );
  }
}