import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface StandingsChartProps {
  teams: { name: string; score: number }[];
}

const StandingsChart: React.FC<StandingsChartProps> = ({ teams }) => {
  const chartData = {
    series: [
      {
        name: 'Scores',
        data: teams.map((team) => team.score),
      },
    ],
    options: {
      chart: {
        type: 'rangeBar' as const,
      },
      xaxis: {
        categories: teams.map((team) => team.name),
      },
    },
  };

  return <ReactApexChart options={chartData.options} series={chartData.series} type="bar" />;
};

export default StandingsChart;
