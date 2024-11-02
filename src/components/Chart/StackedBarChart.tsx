import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StackedBarChartProps {
  chartData: any; // Update this as needed to reflect your actual data types
  text_data: string;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  chartData,
  text_data,
}) => {
  // Properly typed options for the stacked bar chart
  const options: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: "y", // Set to "y" for horizontal bar chart
    plugins: {
      title: {
        display: true,
        text: text_data,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Count",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Depth (meters)",
        },
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StackedBarChart;
