"use client";

import { LineChart as ReLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface LineChartProps {
  data: { [key: string]: number | string }[];
  xKey: string;
  yKey: string;
}

export default function LineChart({ data, xKey, yKey }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={yKey} stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
      </ReLineChart>
    </ResponsiveContainer>
  );
}
