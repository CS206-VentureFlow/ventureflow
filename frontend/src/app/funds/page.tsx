import PageTitle from "@/components/PageTitle";
import Card, { CardProps } from "@/components/card";
import LineChart from "@/components/Charts";
import BarChart from "@/components/BarChart";
import { TrendingUp, TrendingDown, DollarSign, Clock } from "lucide-react";

const fundMetrics: CardProps[] = [
  {
    label: "Internal Rate of Return (IRR)",
    amount: "12.5%",
    discription: "Average annual return of the fund",
    icon: TrendingUp,
  },
  {
    label: "Multiple on Invested Capital (MOIC)",
    amount: "2.3x",
    discription: "Total value of investments relative to initial capital",
    icon: DollarSign,
  },
  {
    label: "Total Value to Paid-In (TVPI)",
    amount: "1.8x",
    discription: "Fund's total value relative to contributed capital",
    icon: DollarSign,
  },
  {
    label: "Distributions to Paid-In (DPI)",
    amount: "0.9x",
    discription: "Capital returned to investors compared to contributions",
    icon: TrendingUp,
  },
  {
    label: "Residual Value to Paid-In (RVPI)",
    amount: "0.9x",
    discription: "Remaining investments relative to paid-in capital",
    icon: TrendingDown,
  },
  {
    label: "Time to Liquidity",
    amount: "5.2 years",
    discription: "Average time to exit investments",
    icon: Clock,
  },
];

const irrData = [
  { year: "2019", value: 8 },
  { year: "2020", value: 10 },
  { year: "2021", value: 12 },
  { year: "2022", value: 14 },
  { year: "2023", value: 12.5 },
];

const tvpiData = [
  { quarter: "Q1", value: 1.2 },
  { quarter: "Q2", value: 1.4 },
  { quarter: "Q3", value: 1.6 },
  { quarter: "Q4", value: 1.8 },
];

export default function FundPerformance() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Fund Performance Metrics" />
      
      {/* Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {fundMetrics.map((metric, index) => (
          <Card
            key={index}
            label={metric.label}
            amount={metric.amount}
            discription={metric.discription}
            icon={metric.icon}
          />
        ))}
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">IRR Over Time</h2>
          <LineChart data={irrData} xKey="year" yKey="value" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">TVPI Trend</h2>
          <BarChart data={tvpiData} xKey="quarter" yKey="value" />
        </div>
      </section>
    </div>
  );
}
