type Props = {
  label: string;
  count: number;
};

export default function SeverityCard({
  label,
  count,
}: Props) {
  return (
    <div className="rounded-2xl border border-[#2A3136] bg-[#171A1D] p-5">
      <p className="text-slate-400">
        {label}
      </p>

      <h3 className="mt-2 text-3xl font-bold">
        {count}
      </h3>
    </div>
  );
}