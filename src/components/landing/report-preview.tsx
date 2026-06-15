export default function ReportPreview() {
  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold">
        Security Report Preview
      </h2>

      <div className="mt-8 rounded-3xl border border-[#2A3136] bg-[#171A1D] p-8">
        <div className="flex items-center justify-between">
          <h3>Security Score</h3>

          <span className="text-4xl font-bold text-[#6FA37F]">
            82
          </span>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-[#1C2023] p-4">
            Critical: 1
          </div>

          <div className="rounded-xl bg-[#1C2023] p-4">
            High: 2
          </div>

          <div className="rounded-xl bg-[#1C2023] p-4">
            Medium: 4
          </div>

          <div className="rounded-xl bg-[#1C2023] p-4">
            Low: 3
          </div>
        </div>
      </div>
    </section>
  );
}