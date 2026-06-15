type Props = {
  title: string;
  severity: string;
  description: string;
};

export default function FindingItem({
  title,
  severity,
  description,
}: Props) {
  return (
    <div className="rounded-2xl border border-[#2A3136] bg-[#171A1D] p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">
          {title}
        </h3>

        <span className="rounded-full border border-[#2D5A43] px-3 py-1 text-xs text-[#6FA37F]">
          {severity}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-400">
        {description}
      </p>
    </div>
  );
}