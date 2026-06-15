export default function CTA() {
  return (
    <section className="py-12 text-center">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 inline-flex rounded-full border border-[#2A3136] bg-[#171A1D] px-4 py-2 text-sm text-[#7FA58E]">
          Security Headers • Dependencies • Secrets • XSS
        </div>

        <h2 className="text-5xl font-bold tracking-tight">
          Scan Websites & GitHub Repositories
        </h2>

        <p className="mt-6 text-lg text-slate-400">
          Identify security misconfigurations, exposed secrets,
          outdated dependencies, and XSS injection points in
          seconds.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="scan"
            className="rounded-xl bg-[#2D5A43] px-6 py-3 font-medium transition hover:bg-[#35684D]"
          >
            Start Scanning
          </a>

          <a
            href="demo"
            className="rounded-xl border border-[#2A3136] px-6 py-3 font-medium text-slate-300 transition hover:bg-[#171A1D]"
          >
            View Sample Report
          </a>
        </div>
      </div>
    </section>
  );
}