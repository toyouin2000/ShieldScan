"use client";

import { useState }
  from "react";

export function useAdvice() {
  const [loading,
    setLoading] =
    useState(false);

  const [advice,
    setAdvice] =
    useState("");

  async function generate(
    issue: string
  ) {
    setLoading(true);

    const response =
      await fetch(
        "/api/advice",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            issue,
          }),
        }
      );

    const data =
      await response.json();

    setAdvice(
      data.advice
    );

    setLoading(false);
  }

  return {
    advice,
    loading,
    generate,
  };
}