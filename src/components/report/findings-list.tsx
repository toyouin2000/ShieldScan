import FindingItem from "./finding-item";

type Props = {
  findings: any[];
};

export default function FindingsList({
  findings,
}: Props) {
  return (
    <div className="space-y-4">
      {findings.map((finding, index) => (
        <FindingItem
          key={index}
          title={finding.title}
          severity={finding.severity}
          description={finding.description}
        />
      ))}
    </div>
  );
}