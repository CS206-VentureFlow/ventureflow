import React from "react";
import BarChart from "@/components/BarChart";
import LineChart from "@/components/Charts";
import PieChart from "@/components/PieChart";

export type GraphType = "barChart" | "lineChart" | "pieChart";

export interface FundData {
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

// Non-pie chart props
interface NonPieGraphProps {
    graphType: "barChart" | "lineChart";
    graphMetric: keyof FundData;
    fundData: FundData;
}

// Pie chart with a single metric
interface PieGraphPropsSingle {
    graphType: "pieChart";
    graphMetric: keyof FundData;
    fundData: FundData;
}

// Pie chart with multiple metrics
interface PieGraphPropsMulti {
    graphType: "pieChart";
    graphMetric: (keyof FundData)[];
    fundData: FundData;
}

export type GraphProps = NonPieGraphProps | PieGraphPropsSingle | PieGraphPropsMulti;

const Graph: React.FC<GraphProps> = (props) => {
    const { graphType, fundData } = props;

    // Helper function to generate a colour based on index
    const getColor = (index: number): string => {
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
        return colors[index % colors.length];
    };

    switch (graphType) {
        case "barChart":
            return (
                <BarChart
                    data={fundData[(props as NonPieGraphProps).graphMetric]}
                    xKey="month"
                    yKey="value"
                    fillColor="#005f73"
                />
            );
        case "lineChart":
            return (
                <LineChart
                    data={fundData[(props as NonPieGraphProps).graphMetric]}
                    xKey="month"
                    yKey="value"
                />
            );
        case "pieChart":
            if (Array.isArray(props.graphMetric)) {
                // Multiple metrics: one entry per metric computed by aggregating the total value.
                const pieData = props.graphMetric.map((metric, index) => {
                    const total = fundData[metric].reduce((acc, item) => acc + item.value, 0);
                    return { name: metric, value: total, color: getColor(index) };
                });
                return (
                    <PieChart
                        data={pieData}
                        title="Number of Initial Investments"
                    />
                );
            } else {
                // Single metric: use at most 4 entries from this metric.
                const entries = fundData[props.graphMetric].slice(0, 4);
                const pieData = entries.map((entry, index) => ({
                    name: entry.month,
                    value: entry.value,
                    color: getColor(index),
                }));
                return (
                    <PieChart
                        data={pieData}
                        title="Number of Initial Investments"
                    />
                );
            }
        default:
            return null;
    }
};

export default Graph;