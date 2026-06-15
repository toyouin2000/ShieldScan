type Props = {
  score: number;
};

export default function ScoreCard({
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
        Security Score
      </p>

      <div className="mt-4 flex items-end gap-4">
        <h2 className="text-7xl font-bold text-[#6FA37F]">
          {score}
        </h2>

        <span className="mb-3 rounded-xl bg-[#2D5A43]/20 px-4 py-2 text-[#6FA37F]">
          Grade {grade}
        </span>
      </div>
    </div>
  );
}