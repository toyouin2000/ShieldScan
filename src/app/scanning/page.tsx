"use client";

import { useEffect } from "react";

import { useRouter }
  from "next/navigation";

import ScanProgress
  from "@/components/scanning/scan-progress";

export default function ScanningPage() {
  const router =
    useRouter();

  useEffect(() => {
    const timeout =
      setTimeout(() => {
        router.push(
          "/report"
        );
      }, 5000);

    return () =>
      clearTimeout(timeout);
  }, [router]);

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6">
      <div className="w-full rounded-3xl border border-[#2A3136] bg-[#171A1D] p-10">
        <h1 className="mb-3 text-5xl font-bold">
          ShieldScan
        </h1>

        <p className="mb-10 text-slate-400">
          Running security analysis...
        </p>

        <ScanProgress />
      </div>
    </main>
  );
}