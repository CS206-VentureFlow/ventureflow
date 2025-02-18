'use client'
import React from 'react'
import { Bar, ResponsiveContainer } from 'recharts'
import { BarChart as BarGraph, XAxis, YAxis } from 'recharts'

interface BarChartProps {
  data: { [key: string]: number | string }[];
  xKey: string;
  yKey: string;
  fillColor?: string;
}

export default function BarChart({ data, xKey, yKey, fillColor = "#005f73" }: BarChartProps) {
  return (
    <ResponsiveContainer width={'100%'} height={350}>
      <BarGraph data={data}>
        <XAxis
          dataKey={xKey}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey={yKey} radius={[4, 4, 0, 0]} fill={fillColor} />
      </BarGraph>
    </ResponsiveContainer>
  )
}
