import ScanForm from "@/components/scan/scan-form";

export default function ScanPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Security Scan
        </h1>

        <p className="mt-3 text-slate-400">
          Analyze websites and GitHub repositories
          for vulnerabilities.
        </p>
      </div>

      <ScanForm />
    </main>
  );
}