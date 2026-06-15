"use client";

import { useState } from "react";

export function useScan() {
  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  async function runScan(url: string) {
    try {
      setLoading(true);

      const response =
        await fetch("/api/scan", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            url,
          }),
        });

      const data =
        await response.json();

      setResult(data);

      return data;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    result,
    runScan,
  };
}