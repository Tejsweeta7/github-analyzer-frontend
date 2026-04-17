import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function LanguageChart({ repos }) {

  if (!repos || repos.length === 0) return null;

  const languageCount = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] =
        (languageCount[repo.language] || 0) + 1;
    }
  });

  const data = {
    labels: Object.keys(languageCount),
    datasets: [
      {
        data: Object.values(languageCount),
        backgroundColor: [
          "#60a5fa",
          "#34d399",
          "#f87171",
          "#fbbf24",
          "#a78bfa"
        ]
      }
    ]
  };

  return (

    <div className="max-w-md mx-auto mt-10">

      <h2 className="text-xl font-bold mb-4 text-center">
        Language Usage
      </h2>

      <Pie data={data} />

    </div>

  );
}

export default LanguageChart;