import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const CompareChart = ({ dev1, dev2 }) => {
  if (!dev1 || !dev2) return null;

  const data = {
    labels: ["Repos", "Followers", "Score"],
    datasets: [
      {
        label: dev1.data.login,
        data: [
          dev1.repos.length,      // ✅ FIXED
          dev1.data.followers,
          dev1.score,
        ],
        backgroundColor: "rgba(99, 102, 241, 0.7)",
      },
      {
        label: dev2.data.login,
        data: [
          dev2.repos.length,      // ✅ FIXED
          dev2.data.followers,
          dev2.score,
        ],
        backgroundColor: "rgba(236, 72, 153, 0.7)",
      },
    ],
  };

  return (
    <div className="mt-8 bg-gray-800 p-5 rounded-xl">
      <h3 className="text-lg font-semibold mb-3 text-white">
        📊 Comparison Graph
      </h3>
      <Bar data={data} />
    </div>
  );
};

export default CompareChart;