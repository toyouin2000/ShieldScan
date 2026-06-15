import Hero from "@/components/landing/hero";
import FeatureGrid from "@/components/landing/feature-grid";
import Workflow from "@/components/landing/workflow";
import ReportPreview from "@/components/landing/report-preview";
import CTA from "@/components/landing/cta";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6">
      <Hero />
      <FeatureGrid />
      <Workflow />
      {/* <ReportPreview /> */}
      <CTA />
    </main>
  );
}