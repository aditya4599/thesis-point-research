"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { year: "2022", revenue: 142, eps: 58 },
  { year: "2023", revenue: 158, eps: 64 },
  { year: "2024", revenue: 172, eps: 71 },
  { year: "2025E", revenue: 188, eps: 78 },
];

export function StockReportChart() {
  return (
    <div className="h-64 min-h-[256px] w-full min-w-[200px] border border-border bg-surface p-4">
      <p className="mb-2 text-xs font-semibold uppercase text-text-muted">
        Revenue & EPS (Placeholder)
      </p>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="revenue" fill="#071A34" name="Revenue" />
          <Bar dataKey="eps" fill="#5B6472" name="EPS" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
