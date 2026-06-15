import {
  Shield,
//   Github,
  Brain,
  ScanSearch,
} from "lucide-react";

const features = [
  {
    title: "Security Headers",
    icon: Shield,
    desc: "Detect missing security protections."
  },
  {
    title: "Repository Analysis",
    icon: Brain,
    desc: "Analyze dependencies and secrets."
  },
  {
    title: "AI Recommendations",
    icon: Brain,
    desc: "Understand vulnerabilities instantly."
  },
  {
    title: "Automated Scanning",
    icon: ScanSearch,
    desc: "One-click security assessments."
  }
];

export default function FeatureGrid() {
  return (
    <section className="py-12">
      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border border-[#2A3136] bg-[#171A1D] p-8"
          >
            <feature.icon className="mb-4 h-8 w-8 text-[#6FA37F]" />

            <h3 className="text-xl font-semibold">
              {feature.title}
            </h3>

            <p className="mt-3 text-slate-400">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}