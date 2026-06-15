import Logo from "@/components/shared/logo";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="py-24">
      <Logo />

      <div className="mt-10 max-w-4xl">
        <div className="inline-flex rounded-full border border-[#2D5A43]/30 bg-[#2D5A43]/10 px-4 py-2 text-sm text-[#6FA37F]">
          AI Security Intelligence
        </div>

        <h1 className="mt-6 text-6xl font-bold leading-tight">
          Identify Security Risks
          <span className="block text-[#6FA37F]">
            Before Attackers Do
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          Scan websites and GitHub repositories,
          detect vulnerabilities and receive
          AI-powered remediation guidance.
        </p>

        <Link
            href="/scan"
            className="mt-8 inline-block rounded-xl bg-[#2D5A43] px-6 py-3"
            >
            Start Scanning
        </Link>
      </div>
    </section>
  );
}