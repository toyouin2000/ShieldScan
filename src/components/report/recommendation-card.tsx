import ReactMarkdown from "react-markdown";

export default function RecommendationCard({
  content,
}: {
  content: string;
}) {
  return (
    <div className="rounded-3xl border border-[#2A3136] bg-[#14181C] p-6">
      <h2 className="mb-4 text-2xl font-bold">
        AI Recommendation
      </h2>

      <div
        className="
          prose
          prose-invert
          max-w-none
          prose-p:text-slate-300
          prose-li:text-slate-300
          prose-strong:text-white
        "
      >
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}