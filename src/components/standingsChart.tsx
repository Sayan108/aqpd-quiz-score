import React from "react";
import ReactApexChart from "react-apexcharts";

interface StandingsChartProps {
  teams: string[];
  totalScores: number[];
}

const StandingsChart: React.FC<StandingsChartProps> = ({
  teams,
  totalScores,
}) => {
  const chartData = {
    series: [
      {
        name: "Scores",
        data: totalScores,
      },
    ],
    options: {
      chart: {
        type: "rangeBar" as const,
      },
      xaxis: {
        categories: teams,
      },
    },
  };

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="bar"
    />
  );
};

export default StandingsChart;
