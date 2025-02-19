"use client"

import { useState } from "react"
import PageTitle from "@/components/PageTitle"
import Card from "@/components/card"
import BarChart from "@/components/BarChart"
import LineChart from "@/components/Charts"
import PieChart from "@/components/PieChart"
import MetricFilter from "@/components/MetricFilter"
import ExcelUpload from "@/components/ExcelUpload"
import FundsList from "@/components/FundsList"
import { TrendingUp, TrendingDown, DollarSign, Clock } from "lucide-react"

const fundMetrics = [
  { label: "IRR", amount: "15%", discription: "Internal Rate of Return", icon: TrendingUp },
  { label: "MOIC", amount: "2.5x", discription: "Multiple on Invested Capital", icon: TrendingUp },
  { label: "TVPI", amount: "3.0x", discription: "Total Value to Paid-In Capital", icon: TrendingUp },
  { label: "DPI", amount: "0.8x", discription: "Distributed to Paid-In Capital", icon: TrendingDown },
  { label: "RVPI", amount: "2.2x", discription: "Residual Value to Paid-In Capital", icon: TrendingUp },
  { label: "Time to Liquidity", amount: "36 Months", discription: "Time to Liquidity", icon: Clock },
  { label: "Initial Investments", amount: "10", discription: "Number of Initial Investments", icon: DollarSign },
]

const investmentData = [
  { name: "Accelerator", value: 27, color: "#0088FE" },
  { name: "Pre-Seed", value: 26, color: "#001F3F" },
  { name: "Seed", value: 20, color: "#DDDDDD" },
  { name: "Series A", value: 16, color: "#FFA07A" },
];

const irrData = [
  { month: "Jan", value: 5 },
  { month: "Feb", value: 8 },
  { month: "Mar", value: 12 },
  { month: "Apr", value: 10 },
  { month: "May", value: 15 },
]

const tvpiData = [
  { month: "Jan", value: 1.2 },
  { month: "Feb", value: 1.5 },
  { month: "Mar", value: 1.8 },
  { month: "Apr", value: 2.0 },
  { month: "May", value: 2.5 },
]

const dpiData = [
  { month: "Jan", value: 0.3 },
  { month: "Feb", value: 0.5 },
  { month: "Mar", value: 0.7 },
  { month: "Apr", value: 0.9 },
  { month: "May", value: 1.0 },
]

const moicData = [
  { month: "Jan", value: 1.8 },
  { month: "Feb", value: 2.0 },
  { month: "Mar", value: 2.2 },
  { month: "Apr", value: 2.5 },
  { month: "May", value: 2.8 },
]

const rvpiData = [
  { month: "Jan", value: 1.5 },
  { month: "Feb", value: 1.8 },
  { month: "Mar", value: 2.0 },
  { month: "Apr", value: 2.2 },
  { month: "May", value: 2.5 },
]

export default function FundPerformance() {
  const allMetrics = ["IRR", "MOIC", "TVPI", "DPI", "RVPI", "Time to Liquidity", "Initial Investments"]
  const [selectedMetrics, setSelectedMetrics] = useState(allMetrics)

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics((prev) => (prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]))
  }

  const filteredFundMetrics = fundMetrics.filter((metric) => selectedMetrics.includes(metric.label.split(" ")[0]))

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Fund Performance Metrics" />

      {/* Funds List */}
      <FundsList vcID="1" />

      {/* Excel Upload */}
      <ExcelUpload vcID="1" fundID="1" />

      {/* Metric Filter */}
      <MetricFilter metrics={allMetrics} selectedMetrics={selectedMetrics} onMetricToggle={handleMetricToggle} />

      {/* Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredFundMetrics.map((metric, index) => (
          <Card
            key={index}
            label={metric.label}
            amount={metric.amount}
            discription={metric.discription}
            icon={metric.icon}
          />
        ))}
      </section>

      {/* Pie Chart */}
      {selectedMetrics.includes("Initial Investments") && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PieChart data={investmentData} title="Number of Initial Investments" />
        </section>
      )}

      {/* Individual Line Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {selectedMetrics.includes("IRR") && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">IRR Over Time</h2>
            <LineChart data={irrData} xKey="month" yKey="value" />
          </div>
        )}

        {selectedMetrics.includes("TVPI") && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">TVPI Trend</h2>
            <BarChart data={tvpiData} xKey="month" yKey="value" fillColor="#005f73" />
          </div>
        )}

        {selectedMetrics.includes("DPI") && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">DPI Trend</h2>
            <LineChart data={dpiData} xKey="month" yKey="value" />
          </div>
        )}

        {selectedMetrics.includes("MOIC") && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Gross MOIC Trend</h2>
            <LineChart data={moicData} xKey="month" yKey="value" />
          </div>
        )}

        {selectedMetrics.includes("RVPI") && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">RVPI Trend</h2>
            <LineChart data={rvpiData} xKey="month" yKey="value" />
          </div>
        )}
      </section>
    </div>
  )
}

