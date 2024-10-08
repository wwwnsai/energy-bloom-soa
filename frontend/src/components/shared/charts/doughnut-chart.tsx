"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart: React.FC<{ totalUsage: number; remainingUsage: number }> = ({ totalUsage, remainingUsage }) => {
  const data = {
    labels: ["Used", "Remaining"],
    datasets: [
      {
        data: [totalUsage, remainingUsage],
        backgroundColor: ["#f0fcbc", "#CCCCCC"],
        borderColor: ["#CCCCCC", "#CCCCCC"],
        borderWidth: 1,
        borderRadius: 4, 
      },
    ],
  };

  const options = {
    cutout: "80%",
    rotation: 270,
    circumference: 180,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="absolute w-64 h-64 scale-150">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center"></div>
    </div>
  );
};

export default DoughnutChart;
