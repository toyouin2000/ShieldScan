export default function DemoReportPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <div className="rounded-3xl border border-[#2A3136] bg-[#171A1D] p-8">
        <h1 className="text-4xl font-bold">
          Security Report
        </h1>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-[#1C2023] p-5">
            Score
            <div className="mt-2 text-4xl font-bold text-[#6FA37F]">
              82
            </div>
          </div>

          <div className="rounded-2xl bg-[#1C2023] p-5">
            Critical
            <div className="mt-2 text-3xl font-bold">
              1
            </div>
          </div>

          <div className="rounded-2xl bg-[#1C2023] p-5">
            High
            <div className="mt-2 text-3xl font-bold">
              2
            </div>
          </div>

          <div className="rounded-2xl bg-[#1C2023] p-5">
            Medium
            <div className="mt-2 text-3xl font-bold">
              4
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-[#1C2023] p-6">
          <h2 className="font-semibold">
            Findings
          </h2>

          <ul className="mt-4 space-y-3 text-slate-400">
            <li>Missing CSP Header</li>
            <li>Missing HSTS Header</li>
            <li>Outdated React Version</li>
          </ul>
        </div>
      </div>
    </main>
  );
}