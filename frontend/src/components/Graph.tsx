"use client"

import type React from "react"
import { useMemo } from "react"
import BarChart from "@/components/BarChart"
import LineChart from "@/components/Charts"
import PieChart from "@/components/PieChart"
import AreaChart from "@/components/AreaChart"

export type GraphType = "barChart" | "lineChart" | "pieChart" | "areaChart"
export type TimeRange = "1M" | "3M" | "6M" | "1Y" | "5Y"

export interface FundData {
  accelerator: { month: string; value: number }[]
  seed: { month: string; value: number }[]
  seriesA: { month: string; value: number }[]
  irr: { month: string; value: number }[]
  rvpi: { month: string; value: number }[]
  dpi: { month: string; value: number }[]
  preSeed: { month: string; value: number }[]
  tvpi: { month: string; value: number }[]
  moic: { month: string; value: number }[]
}

interface NonPieGraphProps {
  graphType: "barChart" | "lineChart" | "areaChart"
  graphMetric: keyof FundData
  fundData: FundData
  title: string
}

interface PieGraphPropsSingle {
  graphType: "pieChart"
  graphMetric: keyof FundData
  fundData: FundData
  title: string
}

interface PieGraphPropsMulti {
  graphType: "pieChart"
  graphMetric: (keyof FundData)[]
  fundData: FundData
  title: string
}

export type GraphProps = NonPieGraphProps | PieGraphPropsSingle | PieGraphPropsMulti

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: "1M", label: "1 Month" },
  { value: "3M", label: "3 Months" },
  { value: "6M", label: "6 Months" },
  { value: "1Y", label: "1 Year" },
  { value: "5Y", label: "5 Years" },
]

interface GraphProps extends NonPieGraphProps {
  timeRange: TimeRange
}

const Graph: React.FC<GraphProps> = ({ fundData, graphType, graphMetric, timeRange, title }) => {
  // Filter data based on selected time range
  const filteredData = useMemo(() => {
    if (graphType === "pieChart") return fundData

    const data = fundData[graphMetric]
    const months = {
      "1M": 1,
      "3M": 3,
      "6M": 6,
      "1Y": 12,
      "5Y": 60,
    }[timeRange]

    return data.slice(-months)
  }, [fundData, timeRange, graphType, graphMetric])

  // Helper function to generate a colour based on index
  const getColor = (index: number): string => {
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]
    return colors[index % colors.length]
  }

  const renderGraph = (props: GraphProps) => {
    switch (graphType) {
      case "barChart":
        return <BarChart data={filteredData} xKey="month" yKey="value" fillColor="#005f73" />
      case "lineChart":
        return <LineChart data={filteredData} xKey="month" yKey="value" />
      case "areaChart":
        return <AreaChart data={filteredData} xKey="month" yKey="value" />
      case "pieChart":
        if (Array.isArray((props as PieGraphPropsMulti).graphMetric)) {
          const pieData = (props as PieGraphPropsMulti).graphMetric.map((metric, index) => {
            const total = fundData[metric].reduce((acc, item) => acc + item.value, 0)
            return { name: metric, value: total, color: getColor(index) }
          })
          return <PieChart data={pieData} title={title} />
        } else {
          const entries = fundData[(props as PieGraphPropsSingle).graphMetric].slice(0, 4)
          const pieData = entries.map((entry, index) => ({
            name: entry.month,
            value: entry.value,
            color: getColor(index),
          }))
          return <PieChart data={pieData} title={title} />
        }
      default:
        return null
    }
  }

  return <div className="w-full">{renderGraph({ fundData, graphType, graphMetric, timeRange, title })}</div>
}

export default Graph

