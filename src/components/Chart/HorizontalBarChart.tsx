import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

interface HorizontalBarChartProps {
  chartData: any;
  text_data: string;
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  chartData,
  text_data,
}) => {
  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: text_data,
            },
          },
          indexAxis: "y", // Set chart to horizontal
          scales: {
            x: {
              title: {
                display: true,
                text: "Depth of Soil (pa)",
              },
              beginAtZero: true,
            },
            y: {
              title: {
                display: true,
                text: "Classification",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default HorizontalBarChart;
