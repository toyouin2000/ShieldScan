type Props = {
  score: number;
};

export default function ExecutiveSummary({
  score,
}: Props) {
  return (
    <div className="rounded-3xl border border-[#2A3136] bg-[#171A1D] p-8">
      <h2 className="text-2xl font-bold">
        Executive Summary
      </h2>

      <p className="mt-4 text-slate-400">
        ShieldScan completed a security
        assessment and assigned a score of{" "}
        {score}/100 based on identified
        vulnerabilities and security posture.
      </p>
    </div>
  );
}