import { ShieldCheck } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-[#2D5A43]/20 p-2 border border-[#2D5A43]/30">
        <ShieldCheck className="h-6 w-6 text-[#4E8B68]" />
      </div>

      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          ShieldScan
        </h1>
        <p className="text-xs text-slate-400">
          Security Health Scanner
        </p>
      </div>
    </div>
  );
}