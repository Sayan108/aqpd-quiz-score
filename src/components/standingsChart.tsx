import { CloseOutlined } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface StandingsChartProps {
  teams: string[];
  totalScores: number[];
  setShowChart: any;
}

const StandingsChart: React.FC<StandingsChartProps> = ({
  teams,
  totalScores,
  setShowChart,
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
    <Box sx={{ height: "100vh" }}>
      <Stack display={"flex"} flexDirection={"row-reverse"}>
        <Button
          onClick={() => {
            setShowChart(false);
          }}
        >
          <CloseOutlined />{" "}
        </Button>
      </Stack>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
      />
    </Box>
  );
};

export default StandingsChart;
