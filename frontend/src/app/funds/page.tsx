"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "@/components/PageTitle";
import Card from "@/components/card";
import BarChart from "@/components/BarChart";
import LineChart from "@/components/Charts";
import PieChart from "@/components/PieChart";
import MetricFilter from "@/components/MetricFilter";
import ExcelUpload from "@/components/ExcelUpload";
import FundsList from "@/components/FundsList";
import Graph from "../../components/Graph";
import { TrendingUp, TrendingDown, DollarSign, Clock } from "lucide-react";

const fundMetrics = [
  { label: "IRR", amount: "15%", description: "Internal Rate of Return", icon: TrendingUp },
  { label: "MOIC", amount: "2.5x", description: "Multiple on Invested Capital", icon: TrendingUp },
  { label: "TVPI", amount: "3.0x", description: "Total Value to Paid-In Capital", icon: TrendingUp },
  { label: "DPI", amount: "0.8x", description: "Distributed to Paid-In Capital", icon: TrendingDown },
  { label: "RVPI", amount: "2.2x", description: "Residual Value to Paid-In Capital", icon: TrendingUp },
  { label: "Time to Liquidity", amount: "36 Months", description: "Time to Liquidity", icon: Clock },
  { label: "Initial Investments", amount: "10", description: "Number of Initial Investments", icon: DollarSign },
];

type DashboardMetric = {
  selected: boolean;
  graphType: string;
  timeRange: string;
};

type DashboardData = {
  irr: DashboardMetric;
  moic: DashboardMetric;
  tvpi: DashboardMetric;
  dpi: DashboardMetric;
  rvpi: DashboardMetric;
};

export default function FundPerformance() {
  const allMetrics = ["IRR", "MOIC", "TVPI", "DPI", "RVPI", "Time to Liquidity", "Initial Investments"];
  const [selectedMetrics, setSelectedMetrics] = useState(allMetrics);

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  // serialise the selected metrics and graph types
  function serializeDashboardData(data: DashboardData): string {
    return Object.entries(data)
      .map(([metric, { selected, graphType, timeRange }]) => {
        return `${metric}#${selected}#${graphType}#${timeRange}`;
      })
      .join(",");
  }

  // Deserialises dashboard layout string from backend
  function updateDashboardData(serialized: string): void {
    const validMetrics: Array<keyof DashboardData> = ["irr", "moic", "tvpi", "dpi", "rvpi"];
    const newDashboardData = {} as DashboardData;
    serialized.split(",").forEach((item) => {
      const [metric, selectedStr, graphType, timeRange] = item.split("#");
      if (validMetrics.includes(metric as keyof DashboardData)) {
        newDashboardData[metric as keyof DashboardData] = {
          selected: selectedStr === "true",
          graphType,
          timeRange,
        };
      }
    });
    setDashboardData(newDashboardData);
  }

  interface FundData {
    accelerator: { month: string; value: number }[];
    seed: { month: string; value: number }[];
    seriesA: { month: string; value: number }[];
    irr: { month: string; value: number }[];
    rvpi: { month: string; value: number }[];
    dpi: { month: string; value: number }[];
    preSeed: { month: string; value: number }[];
    tvpi: { month: string; value: number }[];
    moic: { month: string; value: number }[];
  }

  const [fundData, setFundData] = useState<FundData | null>(null);

  // Fetch the data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/fund/1/getData");
        setFundData(response.data);
        console.log("Fetched fund data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics((prev) => (prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]));
  };

  const filteredFundMetrics = fundMetrics.filter((metric) => selectedMetrics.includes(metric.label.split(" ")[0]));

  if (!fundData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center justify-between">
        {/* Move FundsList here and reduce its width */}
        <FundsList vcID="2" className="w-auto px-4 py-2 bg-white rounded-lg shadow-sm" />

        {/* Make MetricFilter smaller */}
        <MetricFilter
          metrics={allMetrics}
          selectedMetrics={selectedMetrics}
          onMetricToggle={handleMetricToggle}
          className="w-auto px-4 py-2 text-sm bg-gray-100 rounded-lg shadow-sm"
        />
      </div>

      {/* Keep the page title below FundsList */}
      <div className="flex items-center justify-between">
        <PageTitle title="Fund Performance Metrics" className="mt-4" />
        <ExcelUpload vcID="1" fundID="1" />
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

      {/* Individual Line Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* {selectedMetrics.includes("IRR") && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">IRR Over Time</h2>
            <LineChart data={fundData.irr} xKey="month" yKey="value" />
          </div>
        )} */}

        {selectedMetrics.includes("IRR") && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">IRR</h2>
            <Graph graphMetric={"irr"} graphType={"lineChart"} fundData={fundData} />
          </div>
        )}

        {selectedMetrics.includes("TVPI") && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">TVPI</h2>
            <Graph graphMetric={"irr"} graphType={"lineChart"} fundData={fundData} />
          </div>
        )}

        {selectedMetrics.includes("DPI") && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">DPI Trend</h2>
            <Graph graphMetric={"dpi"} graphType={"lineChart"} fundData={fundData} />
          </div>
        )}

        {selectedMetrics.includes("MOIC") && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Gross MOIC Trend</h2>
            <Graph graphMetric={"moic"} graphType={"lineChart"} fundData={fundData} />
          </div>
        )}

        {selectedMetrics.includes("RVPI") && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">RVPI Trend</h2>
            <Graph graphMetric={"rvpi"} graphType={"lineChart"} fundData={fundData} />
          </div>
        )}
      </section>
    </div>
  );
}