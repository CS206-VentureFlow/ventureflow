"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { Clock, MoreVertical, TrendingUp, TrendingDown, DollarSign, MessageCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { GraphType, TimeRange } from "@/components/Graph"
import Graph from "@/components/Graph"
import PageTitle from "@/components/PageTitle"
import Card from "@/components/card"
import MetricFilter from "@/components/MetricFilter"
import ExcelUpload from "@/components/ExcelUpload"
import FundsList from "@/components/FundsList"
import Link from "next/link"

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: "1M", label: "1 Month" },
  { value: "3M", label: "3 Months" },
  { value: "6M", label: "6 Months" },
  { value: "1Y", label: "1 Year" },
  { value: "5Y", label: "5 Years" },
]

const GRAPH_TYPES: { type: GraphType; label: string }[] = [
  { type: "lineChart", label: "Line Chart" },
  { type: "areaChart", label: "Area Chart" },
  { type: "barChart", label: "Bar Chart" },
  { type: "pieChart", label: "Pie Chart" },
]

const fundMetrics = [
  { label: "Average IRR", amount: "15%", description: "Internal Rate of Return", icon: TrendingUp },
  { label: "Gross MOIC", amount: "2.5x", description: "Multiple on Invested Capital", icon: TrendingUp },
  { label: "TVPI", amount: "3.0x", description: "Total Value to Paid-In Capital", icon: TrendingUp },
  { label: "DPI", amount: "0.8x", description: "Distributed to Paid-In Capital", icon: TrendingDown },
  { label: "RVPI", amount: "2.2x", description: "Residual Value to Paid-In Capital", icon: TrendingUp },
  { label: "Time to Liquidity", amount: "36 Months", description: "Time to Liquidity", icon: Clock },
  { label: "Initial Investments", amount: "10", description: "Number of Initial Investments", icon: DollarSign },
]

type DashboardMetric = {
  selected: boolean
  graphType: GraphType
  timeRange: TimeRange
}

type DashboardData = {
  irr: DashboardMetric
  moic: DashboardMetric
  tvpi: DashboardMetric
  dpi: DashboardMetric
  rvpi: DashboardMetric
}

interface FundData {
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

export default function FundPerformance() {
  const allMetrics = ["IRR", "MOIC", "TVPI", "DPI", "RVPI", "Time to Liquidity", "Initial Investments"]
  const [fundData, setFundData] = useState<FundData | null>(null)
  const [userType, setUserType] = useState(() => sessionStorage.getItem("userType") || "VC")

  // Initialize dashboard data with default values
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    irr: { selected: true, graphType: "lineChart", timeRange: "1M" },
    moic: { selected: true, graphType: "lineChart", timeRange: "1M" },
    tvpi: { selected: true, graphType: "lineChart", timeRange: "1M" },
    dpi: { selected: true, graphType: "lineChart", timeRange: "1M" },
    rvpi: { selected: true, graphType: "lineChart", timeRange: "1M" },
  })

  // Get currently selected metrics from dashboardData
  const selectedMetrics = Object.entries(dashboardData)
    .filter(([_, config]) => config.selected)
    .map(([metric]) => metric.toUpperCase())

  // Serialise the dashboard data
  const serializeDashboardData = useCallback((data: DashboardData): string => {
    return Object.entries(data)
      .map(([metric, { selected, graphType, timeRange }]) => {
        return `${metric}#${selected}#${graphType}#${timeRange}`
      })
      .join(",")
  }, [])

  // Deserialise dashboard layout string from backend
  const updateDashboardData = useCallback((serialized: string): void => {
    const validMetrics: Array<keyof DashboardData> = ["irr", "moic", "tvpi", "dpi", "rvpi"]
    const newDashboardData = {} as DashboardData
    serialized.split(",").forEach((item) => {
      const [metric, selectedStr, graphType, timeRange] = item.split("#")
      if (validMetrics.includes(metric as keyof DashboardData)) {
        newDashboardData[metric as keyof DashboardData] = {
          selected: selectedStr === "true",
          graphType: graphType as GraphType,
          timeRange: timeRange as TimeRange,
        }
      }
    })
    setDashboardData(newDashboardData)
  }, [])

  // Save dashboard layout to backend
  const saveDashboardLayout = useCallback(
    async (data: DashboardData) => {
      try {
        const serializedData = serializeDashboardData(data)
        console.log("Saving dashboard layout:", serializedData)
        await axios.put("http://localhost:8080/api/v1/lp/2/dashboard", serializedData, {
          headers: { "Content-Type": "text/plain" },
        })
        console.log("Dashboard layout saved successfully")
      } catch (error) {
        console.error("Error saving dashboard layout:", error)
      }
    },
    [serializeDashboardData],
  )

  // Update metric configuration and save to backend
  const updateMetricConfig = useCallback(
    (metric: keyof DashboardData, updates: Partial<DashboardMetric>) => {
      setDashboardData((prev) => {
        const newData = {
          ...prev,
          [metric]: { ...prev[metric], ...updates },
        }
        // Save the updated layout to backend
        saveDashboardLayout(newData)
        return newData
      })
    },
    [saveDashboardLayout],
  )

  // Fetch initial dashboard layout and fund data
  useEffect(() => {
    const handleUserTypeChange = () => { 
      setUserType(sessionStorage.getItem("userType") || "VC")
    }
    window.addEventListener("userTypeChange", handleUserTypeChange);
    const fetchData = async () => {
      try {
        // Fetch dashboard layout
        const layoutResponse = await axios.get("http://localhost:8080/api/v1/lp/2/dashboard")
        updateDashboardData(layoutResponse.data)

        // Fetch fund data
        const fundResponse = await axios.get("http://localhost:8080/api/v1/fund/1/getData")
        setFundData(fundResponse.data)

        console.log("Fetched dashboard layout:", layoutResponse.data)
        console.log("Fetched fund data:", fundResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()

    return () => {
      window.removeEventListener("userTypeChange", handleUserTypeChange);
    }
  }, [updateDashboardData])

  // Updated handleMetricToggle to work with dashboardData
  const handleMetricToggle = useCallback(
    (metric: string) => {
      const metricKey = metric.toLowerCase() as keyof DashboardData
      if (dashboardData[metricKey]) {
        updateMetricConfig(metricKey, { selected: !dashboardData[metricKey].selected })
      }
    },
    [dashboardData, updateMetricConfig],
  )

  // Filter metrics based on dashboardData.selected
  const filteredFundMetrics = fundMetrics.filter((metric) => {
    const metricKey = metric.label.split(" ")[0].toLowerCase() as keyof DashboardData
    return dashboardData[metricKey]?.selected ?? true
  })

  if (!fundData) return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center justify-between">
        <FundsList vcID="2" className="w-auto px-4 py-2 bg-white rounded-lg shadow-sm" />
        <div className="flex items-center gap-2">
          <MetricFilter
            metrics={allMetrics}
            selectedMetrics={selectedMetrics}
            onMetricToggle={handleMetricToggle}
            className="w-auto px-4 py-2 text-sm bg-gray-100 rounded-lg shadow-sm"
          />
          <Link href="/fund/1/message-board">
            <Button variant="outline" size="sm" className="h-9">
              <MessageCircle className="h-4 w-4 mr-2" />
              Messages
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <PageTitle title="Fund Performance Metrics" className="mt-4" />
        {userType === "VC" ? (
          <ExcelUpload vcID="1" fundID="1" />
        ) : (
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        )}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredFundMetrics.map((metric, index) => (
          <Card
            key={index}
            label={metric.label}
            amount={metric.amount}
            discription={metric.description}
            icon={metric.icon}
          />
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Object.entries(dashboardData).map(([metric, config]) => {
          if (!config.selected) return null
          const metricKey = metric as keyof DashboardData

          return (
            <div key={metric} className="bg-white p-6 rounded-lg shadow relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{metricKey.toUpperCase()}</h2>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8">
                        <Clock className="h-4 w-4 mr-2" />
                        {TIME_RANGES.find((r) => r.value === config.timeRange)?.label}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48" align="end">
                      <div className="grid gap-2">
                        <h4 className="font-medium leading-none mb-2">Time Range</h4>
                        {TIME_RANGES.map((range) => (
                          <Button
                            key={range.value}
                            variant="ghost"
                            className={cn(
                              "w-full justify-start",
                              config.timeRange === range.value && "bg-primary/10 text-primary",
                            )}
                            onClick={() => updateMetricConfig(metricKey, { timeRange: range.value })}
                          >
                            {range.label}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48" align="end">
                      <div className="grid gap-2">
                        <h4 className="font-medium leading-none mb-2">Chart Type</h4>
                        {GRAPH_TYPES.map((graphType) => (
                          <Button
                            key={graphType.type}
                            variant="ghost"
                            className={cn(
                              "w-full justify-start",
                              config.graphType === graphType.type && "bg-primary/10 text-primary",
                            )}
                            onClick={() => updateMetricConfig(metricKey, { graphType: graphType.type })}
                          >
                            {graphType.label}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Graph
                graphMetric={metricKey}
                graphType={config.graphType}
                timeRange={config.timeRange}
                fundData={fundData}
                title={metricKey.toUpperCase()}
              />
            </div>
          )
        })}
      </section>
    </div>
  )
}

