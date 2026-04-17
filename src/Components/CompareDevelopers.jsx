import { useState } from "react";
import axios from "axios";

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function CompareDevelopers() {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const [result, setResult] = useState(null);

  // 🔥 FIELD DETECTION
  const getField = (repos) => {
    const languages = repos.map((r) => r.language);
    const repoNames = repos.map((r) => r.name.toLowerCase());

    if (
      languages.includes("Python") &&
      (repoNames.some((n) => n.includes("ml")) ||
        repoNames.some((n) => n.includes("ai")))
    ) {
      return "AI / ML 🤖";
    }

    if (
      languages.includes("Jupyter Notebook") ||
      repoNames.some((n) => n.includes("data"))
    ) {
      return "Data Science 📊";
    }

    if (
      languages.includes("JavaScript") &&
      languages.includes("HTML") &&
      languages.includes("CSS")
    ) {
      return "Full Stack 🧑‍💻";
    }

    if (
      languages.includes("JavaScript") &&
      (languages.includes("HTML") || languages.includes("CSS"))
    ) {
      return "Frontend 🎨";
    }

    if (
      languages.includes("Java") ||
      languages.includes("Node") ||
      languages.includes("Express")
    ) {
      return "Backend ⚙️";
    }

    if (
      languages.includes("Dockerfile") ||
      repoNames.some((n) => n.includes("devops"))
    ) {
      return "DevOps ☁️";
    }

    if (
      languages.includes("Kotlin") ||
      languages.includes("Swift") ||
      languages.includes("Dart")
    ) {
      return "Mobile 📱";
    }

    if (
      repoNames.some((n) => n.includes("management")) ||
      repoNames.some((n) => n.includes("report")) ||
      repoNames.some((n) => n.includes("ppt"))
    ) {
      return "Management 📋";
    }

    return "General Developer 💻";
  };

  // 🚀 SCORE FUNCTION
  const calculateScore = (user, repos) => {
    const totalStars = repos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );

    const languageCount = new Set(
      repos.map((repo) => repo.language).filter(Boolean)
    ).size;

    return Math.min(
      100,
      Math.floor(
        repos.length * 2 +
          totalStars * 0.5 +
          user.followers * 0.5 +
          languageCount * 5
      )
    );
  };

  // 🔥 COMPARE FUNCTION
  const compare = async () => {
    try {
      if (!username1 || !username2) {
        alert("Enter both usernames");
        return;
      }

      const [user1Res, repo1Res, user2Res, repo2Res] = await Promise.all([
        axios.get(`https://api.github.com/users/${username1}`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }),
        axios.get(`https://api.github.com/users/${username1}/repos`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }),
        axios.get(`https://api.github.com/users/${username2}`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }),
        axios.get(`https://api.github.com/users/${username2}/repos`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }),
      ]);

      const score1 = calculateScore(user1Res.data, repo1Res.data);
      const score2 = calculateScore(user2Res.data, repo2Res.data);

      const field1 = getField(repo1Res.data);
      const field2 = getField(repo2Res.data);

      const token = localStorage.getItem("token");

      // 🔥 SAVE USER 1
      await axios.post(
        `${API_BASE_URL}/api/dev/save`,
        {
          username: user1Res.data.login,
          score: score1,
          followers: user1Res.data.followers,
          repos: repo1Res.data.length,
          field: field1,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // 🔥 SAVE USER 2
      await axios.post(
        `${API_BASE_URL}/api/dev/save`,
        {
          username: user2Res.data.login,
          score: score2,
          followers: user2Res.data.followers,
          repos: repo2Res.data.length,
          field: field2,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // RESULT SHOW
      setResult({
        dev1: { data: user1Res.data, score: score1, field: field1 },
        dev2: { data: user2Res.data, score: score2, field: field2 },
      });
    } catch (err) {
      console.log(err);
      alert("Error occurred. Check console.");
    }
  };

  return (
    <div className="text-center">

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Username 1"
          value={username1}
          onChange={(e) => setUsername1(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
        />
        <input
          type="text"
          placeholder="Username 2"
          value={username2}
          onChange={(e) => setUsername2(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white"
        />
        <button
          onClick={compare}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold"
        >
          Compare
        </button>
      </div>

      {result && (
        <div className="mt-6 text-white">
          <div className="flex justify-around mb-4">
            <div>
              <h3 className="font-bold text-lg">
                {result.dev1.data.login}
              </h3>
              <p>Score: {result.dev1.score}</p>
              <p className="text-sm text-gray-400">
                {result.dev1.field}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg">
                {result.dev2.data.login}
              </h3>
              <p>Score: {result.dev2.score}</p>
              <p className="text-sm text-gray-400">
                {result.dev2.field}
              </p>
            </div>
          </div>

          <h3 className="text-green-400 font-bold text-xl">
            🏆{" "}
            {result.dev1.score > result.dev2.score
              ? result.dev1.data.login
              : result.dev2.data.login}{" "}
            wins!
          </h3>
        </div>
      )}
    </div>
  );
}

export default CompareDevelopers;
