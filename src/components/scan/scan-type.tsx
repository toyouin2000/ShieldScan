type Props = {
  selected: string;
  onChange: (value: string) => void;
};

export default function ScanType({
  selected,
  onChange,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <button
        onClick={() => onChange("website")}
        className={`rounded-2xl border p-5 text-left ${
          selected === "website"
            ? "border-[#2D5A43] bg-[#2D5A43]/10"
            : "border-[#2A3136] bg-[#171A1D]"
        }`}
      >
        <h3 className="font-semibold">
          Website Scan
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Analyze security headers, SSL,
          cookies and XSS risks.
        </p>
      </button>

      <button
        onClick={() => onChange("github")}
        className={`rounded-2xl border p-5 text-left ${
          selected === "github"
            ? "border-[#2D5A43] bg-[#2D5A43]/10"
            : "border-[#2A3136] bg-[#171A1D]"
        }`}
      >
        <h3 className="font-semibold">
          GitHub Repository
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Analyze dependencies, secrets and
          repository health.
        </p>
      </button>
    </div>
  );
}