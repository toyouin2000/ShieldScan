"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  critical: number;
  high: number;
  medium: number;
  low: number;
};

export default function SeverityChart({
  critical,
  high,
  medium,
  low,
}: Props) {
  const data = [
    { name: "Critical", value: critical },
    { name: "High", value: high },
    { name: "Medium", value: medium },
    { name: "Low", value: low },
  ];

  return (
    <div className="rounded-3xl border border-[#2A3136] bg-[#171A1D] p-6">
      <h3 className="mb-4 text-xl font-semibold">
        Severity Distribution
      </h3>

      <div className="h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}