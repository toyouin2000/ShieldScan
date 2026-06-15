"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import ScanType from "./scan-type";

function isValidWebsite(
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

function isValidGithubRepo(
  value: string
) {
  const githubRegex =
    /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/i;

  return githubRegex.test(
    value.trim()
  );
}

export default function ScanForm() {
  const router = useRouter();

  const [scanType, setScanType] =
    useState("website");

  const [target, setTarget] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleScan = async () => {
    setError("");

    if (!target.trim()) {
      setError(
        scanType === "website"
          ? "Please enter a website URL."
          : "Please enter a GitHub repository URL."
      );

      return;
    }

    if (
      scanType === "website" &&
      !isValidWebsite(target)
    ) {
      setError(
        "Please enter a valid website URL."
      );

      return;
    }

    if (
      scanType === "github" &&
      !isValidGithubRepo(target)
    ) {
      setError(
        "Please enter a valid GitHub repository URL."
      );

      return;
    }

    try {
      setLoading(true);

      const endpoint =
        scanType === "github"
          ? "/api/github-scan"
          : "/api/scan";

      const response =
        await fetch(
          endpoint,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              url: target,
            }),
          }
        );

      if (!response.ok) {
        throw new Error(
          "Failed to run scan"
        );
      }

      const data =
        await response.json();

      sessionStorage.setItem(
        "scanResult",
        JSON.stringify(data)
      );

      sessionStorage.setItem(
        "scanType",
        scanType
      );

      sessionStorage.setItem(
        "scanTarget",
        target
      );

      router.push("/report");
    } catch (error) {
      console.error(error);

      setError(
        "Unable to complete the scan. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-[#2A3136] bg-[#171A1D] p-8">
      <ScanType
        selected={scanType}
        onChange={setScanType}
      />

      <div className="mt-8">
        <label className="mb-2 block text-sm">
          {scanType === "website"
            ? "Target Website"
            : "GitHub Repository"}
        </label>

        <input
          value={target}
          onChange={(e) => {
            setTarget(
              e.target.value
            );

            if (error) {
              setError("");
            }
          }}
          placeholder={
            scanType === "website"
              ? "https://example.com"
              : "https://github.com/user/repository"
          }
          className="w-full rounded-xl border border-[#2A3136] bg-[#1C2023] p-4 outline-none focus:border-[#2F6B4F]"
        />

        {error && (
          <p className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>

      <button
        onClick={handleScan}
        disabled={loading}
        className="
          mt-8
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#2F6B4F]
          px-8
          py-4
          font-medium
          transition-all
          hover:bg-[#3A7D5C]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Scanning...
          </>
        ) : (
          "Start Scan"
        )}
      </button>
    </div>
  );
}