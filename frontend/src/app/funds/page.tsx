import PageTitle from "@/components/PageTitle";
import Card, { CardProps } from "@/components/card";
import BarChart from "@/components/BarChart";
import LineChart from "@/components/Charts";
import PieChart from "@/components/PieChart"; // Import PieChart
import { TrendingUp, TrendingDown, DollarSign, Clock } from "lucide-react";

const fundMetrics: CardProps[] = [
  { label: "Internal Rate of Return (IRR)", amount: "12.5%", discription: "Average annual return of the fund", icon: TrendingUp },
  { label: "Multiple on Invested Capital (MOIC)", amount: "2.3x", discription: "Total value of investments relative to initial capital", icon: DollarSign },
  { label: "Total Value to Paid-In (TVPI)", amount: "1.8x", discription: "Fund's total value relative to contributed capital", icon: DollarSign },
  { label: "Distributions to Paid-In (DPI)", amount: "0.9x", discription: "Capital returned to investors compared to contributions", icon: TrendingUp },
  { label: "Residual Value to Paid-In (RVPI)", amount: "0.9x", discription: "Remaining investments relative to paid-in capital", icon: TrendingDown },
  { label: "Time to Liquidity", amount: "5.2 years", discription: "Average time to exit investments", icon: Clock },
];

// Pie Chart Data for Initial Investments
const investmentData = [
  { name: "Accelerator", value: 27, color: "#0088FE" },
  { name: "Pre-Seed", value: 26, color: "#001F3F" },
  { name: "Seed", value: 20, color: "#DDDDDD" },
  { name: "Series A", value: 16, color: "#FFA07A" },
];

// Line Chart Data for Individual Metrics
// Line Chart Data for Individual Metrics (Expanded to Monthly Data)

const irrData = [
  { month: "Jan 2019", value: 8 }, { month: "Jul 2019", value: 8.5 },
  { month: "Jan 2020", value: 10 }, { month: "Jul 2020", value: 10.5 },
  { month: "Jan 2021", value: 12 }, { month: "Jul 2021", value: 12.2 },
  { month: "Jan 2022", value: 14 }, { month: "Jul 2022", value: 13.5 },
  { month: "Jan 2023", value: 12.5 }, { month: "Jul 2023", value: 12.8 }
];

const tvpiData = [
  { month: "Jan 2019", value: 1.2 }, { month: "Jul 2019", value: 1.3 },
  { month: "Jan 2020", value: 1.4 }, { month: "Jul 2020", value: 1.5 },
  { month: "Jan 2021", value: 1.6 }, { month: "Jul 2021", value: 1.7 },
  { month: "Jan 2022", value: 1.8 }, { month: "Jul 2022", value: 1.75 },
  { month: "Jan 2023", value: 1.8 }, { month: "Jul 2023", value: 1.85 }
];

const dpiData = [
  { month: "Jan 2019", value: 0.6 }, { month: "Jul 2019", value: 0.65 },
  { month: "Jan 2020", value: 0.7 }, { month: "Jul 2020", value: 0.75 },
  { month: "Jan 2021", value: 0.8 }, { month: "Jul 2021", value: 0.82 },
  { month: "Jan 2022", value: 0.85 }, { month: "Jul 2022", value: 0.88 },
  { month: "Jan 2023", value: 0.9 }, { month: "Jul 2023", value: 0.92 }
];

const moicData = [
  { month: "Jan 2019", value: 1.5 }, { month: "Jul 2019", value: 1.55 },
  { month: "Jan 2020", value: 1.7 }, { month: "Jul 2020", value: 1.75 },
  { month: "Jan 2021", value: 2.0 }, { month: "Jul 2021", value: 2.05 },
  { month: "Jan 2022", value: 2.2 }, { month: "Jul 2022", value: 2.25 },
  { month: "Jan 2023", value: 2.3 }, { month: "Jul 2023", value: 2.35 }
];

const rvpiData = [
  { month: "Jan 2019", value: 0.9 }, { month: "Jul 2019", value: 0.92 },
  { month: "Jan 2020", value: 0.95 }, { month: "Jul 2020", value: 0.97 },
  { month: "Jan 2021", value: 1.0 }, { month: "Jul 2021", value: 1.02 },
  { month: "Jan 2022", value: 1.05 }, { month: "Jul 2022", value: 1.08 },
  { month: "Jan 2023", value: 1.1 }, { month: "Jul 2023", value: 1.12 }
];


export default function FundPerformance() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Fund Performance Metrics" />

      {/* Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {fundMetrics.map((metric, index) => (
          <Card key={index} label={metric.label} amount={metric.amount} discription={metric.discription} icon={metric.icon} />
        ))}
      </section>

      {/* Pie Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PieChart data={investmentData} title="Number of Initial Investments" />
      </section>

      {/* Individual Line Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">IRR Over Time</h2>
          <LineChart data={irrData} xKey="month" yKey="value" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">TVPI Trend</h2>
          <BarChart data={tvpiData} xKey="month" yKey="value" fillColor="#005f73" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">DPI Trend</h2>
          <LineChart data={dpiData} xKey="month" yKey="value" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Gross MOIC Trend</h2>
          <LineChart data={moicData} xKey="month" yKey="value" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">RVPI Trend</h2>
          <LineChart data={rvpiData} xKey="month" yKey="value" />
        </div>
      </section>
    </div>
  );
}
