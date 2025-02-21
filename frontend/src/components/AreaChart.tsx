"use client"
import { ResponsiveContainer, AreaChart as AreaGraph, Area, XAxis, YAxis } from "recharts"

interface AreaChartProps {
  data: { [key: string]: number | string }[]
  xKey: string
  yKey: string
  fillColor?: string
  strokeColor?: string
}

export default function AreaChart({
  data,
  xKey,
  yKey,
  fillColor = "rgba(0, 95, 115, 0.2)",
  strokeColor = "#005f73",
}: AreaChartProps) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <AreaGraph data={data}>
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} stroke="#888888" fontSize={12} />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `$${value}`}
        />
        <Area type="monotone" dataKey={yKey} stroke={strokeColor} fill={fillColor} strokeWidth={2} />
      </AreaGraph>
    </ResponsiveContainer>
  )
}

