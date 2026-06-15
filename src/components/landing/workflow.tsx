export default function Workflow() {
  const steps = [
    "Enter URL or Repository",
    "Run Security Analysis",
    "Generate Risk Score",
    "Receive AI Guidance"
  ];

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold">
        How It Works
      </h2>

      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className="rounded-2xl border border-[#2A3136] bg-[#171A1D] p-6"
          >
            <div className="text-[#6FA37F]">
              0{index + 1}
            </div>

            <p className="mt-4">
              {step}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}