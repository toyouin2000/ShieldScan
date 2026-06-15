type Props = {
  score: number;
};

export default function ScoreGauge({
  score,
}: Props) {
  const grade =
    score >= 90
      ? "A"
      : score >= 80
      ? "B"
      : score >= 70
      ? "C"
      : "D";

  return (
    <div className="rounded-3xl border border-[#2A3136] bg-[#171A1D] p-8">
      <p className="text-slate-400">
        Security Grade
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-7xl font-bold text-[#6FA37F]">
          {grade}
        </span>

        <span className="text-2xl text-slate-400">
          {score}/100
        </span>
      </div>
    </div>
  );
}