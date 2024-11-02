import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React from "react";

// Register the required components and the datalabels plugin
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface PieChartProps {
  chartData: any;
  text_data: string;
}

const PieChart: React.FC<PieChartProps> = ({ chartData, text_data }) => {
  return (
    <div className="chart-container">
      <h4 className="text-center">Persebaran Klasifikasi Tanah</h4>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: text_data,
            },
            datalabels: {
              formatter: (value: number, context: any) => {
                const total = context.chart.data.datasets[0].data.reduce(
                  (a: number, b: number) => a + b,
                  0
                );
                const percentage = ((value / total) * 100).toFixed(2) + "%";
                return percentage;
              },
              color: "#fff",
              font: {
                size: 16,
                weight: "bold",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
