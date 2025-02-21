"use client"

import type React from "react"
import { useState, useMemo } from "react"
import BarChart from "@/components/BarChart"
import LineChart from "@/components/Charts"
import PieChart from "@/components/PieChart"
import AreaChart from "@/components/AreaChart"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  BarChart2,
  LineChartIcon as LineIcon,
  PieChartIcon as PieIcon,
  MoreVertical,
  TrendingUp,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

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

const Graph: React.FC<GraphProps> = (props) => {
  const { fundData, title } = props
  const [activeGraphType, setActiveGraphType] = useState<GraphType>(props.graphType)
  const [timeRange, setTimeRange] = useState<TimeRange>("1M")

  // Helper function to generate a colour based on index
  const getColor = (index: number): string => {
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]
    return colors[index % colors.length]
  }

  const graphTypes = [
    {
      type: "lineChart" as GraphType,
      icon: LineIcon,
      label: "Line Chart",
    },
    {
      type: "areaChart" as GraphType,
      icon: TrendingUp,
      label: "Area Chart",
    },
    {
      type: "barChart" as GraphType,
      icon: BarChart2,
      label: "Bar Chart",
    },
    // Only show pie chart option for appropriate data
    ...(Array.isArray((props as PieGraphPropsMulti).graphMetric) ||
    typeof (props as PieGraphPropsSingle).graphMetric === "string"
      ? [
          {
            type: "pieChart" as GraphType,
            icon: PieIcon,
            label: "Pie Chart",
          },
        ]
      : []),
  ]

  // Filter data based on selected time range
  const filteredData = useMemo(() => {
    if (props.graphType === "pieChart") return fundData

    const data = fundData[(props as NonPieGraphProps).graphMetric]
    const months = {
      "1M": 1,
      "3M": 3,
      "6M": 6,
      "1Y": 12,
      "5Y": 60,
    }[timeRange]

    return data.slice(-months)
  }, [fundData, timeRange, props.graphType, (props as NonPieGraphProps).graphMetric])

  const renderGraph = () => {
    switch (activeGraphType) {
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

  return (
    <div className="relative w-full">
      <div className="absolute top-0 right-0 z-10 flex items-center gap-2">
        {/* Time Range Selector (only show for non-pie charts) */}
        {activeGraphType !== "pieChart" && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Clock className="h-4 w-4 mr-2" />
                {TIME_RANGES.find((r) => r.value === timeRange)?.label}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48" align="end">
              <div className="grid gap-2">
                <h4 className="font-medium leading-none mb-2">Time Range</h4>
                {TIME_RANGES.map((range) => (
                  <Button
                    key={range.value}
                    variant="ghost"
                    className={cn("w-full justify-start", timeRange === range.value && "bg-primary/10 text-primary")}
                    onClick={() => setTimeRange(range.value)}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Graph Type Selector */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48" align="end">
            <div className="grid gap-2">
              <h4 className="font-medium leading-none mb-2">Chart Type</h4>
              {graphTypes.map((graphType) => (
                <Button
                  key={graphType.type}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    activeGraphType === graphType.type && "bg-primary/10 text-primary",
                  )}
                  onClick={() => setActiveGraphType(graphType.type)}
                >
                  <graphType.icon className="mr-2 h-4 w-4" />
                  {graphType.label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {renderGraph()}
    </div>
  )
}

export default Graph

