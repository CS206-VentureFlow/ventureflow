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


export interface GraphProps {
    graphMetric: keyof FundData;
    graphType: string;
    fundData: FundData;
}

const Graph: React.FC<GraphProps> = ({ graphMetric, graphType, fundData }) => {
    switch (graphType) {
        case "barChart":
            return (
                <BarChart
                    data={fundData[graphMetric]}
                    xKey="month"
                    yKey="value"
                    fillColor="#005f73"
                />
            );
        case "lineChart":
            return (
                <LineChart
                    data={fundData[graphMetric]}
                    xKey="month"
                    yKey="value"
                />
            );
        // case "pieChart":
        //     return (
        //         <PieChart
        //             data={fundData[graphMetric]}
        //             title="Number of Initial Investments"
        //         />
        //     );
        default:
            return null;
    }
};

export default Graph;