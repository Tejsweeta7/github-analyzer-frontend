import { calculateScore, getLevel } from "../utils/devScore";

function DeveloperScore({ user, repos }) {
  if (!user || !repos) return null;

  // 🎯 Calculate Score
  const score = calculateScore(user, repos);

  // 🏆 Get Level
  const level = getLevel(score);

  return (
    <div className="bg-gray-900 border border-purple-500/30 rounded-xl p-6 shadow-lg">

      {/* 🔥 Title */}
      <h2 className="text-2xl font-bold text-center mb-4 text-purple-400">
        Developer Score
      </h2>

      {/* 🎯 Score */}
      <div className="text-center mb-4">
        <p className="text-4xl font-bold text-white">
          {score} / 100
        </p>
        <p className="text-gray-400 mt-1">
          {level}
        </p>
      </div>

      {/* 📊 Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden mb-4">
        <div
          className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        ></div>
      </div>

      {/* 📘 FORMULA (VISIBLE IN UI 🔥) */}
      <div className="bg-gray-800 p-3 rounded-lg text-sm text-gray-300">
        <p className="font-semibold text-purple-400 mb-1">
          📌 Scoring Formula:
        </p>

        <p>
          Score =
          (Repos × 2) +
          (Stars × 0.5) +
          (Followers × 0.5) +
          (Languages × 5)
        </p>
      </div>

    </div>
  );
}

export default DeveloperScore;