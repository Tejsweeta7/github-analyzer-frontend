import { useState, useEffect } from "react";
import axios from "axios";

import SearchBar from "./Components/SearchBar";
import ProfileCard from "./Components/ProfileCard";
import RepoList from "./Components/RepoList";
import LanguageChart from "./Components/LanguageChart";
import StatsCard from "./Components/StatsCard";
import DeveloperScore from "./Components/DeveloperScore";
import CompareDevelopers from "./Components/CompareDevelopers";
import ResumeGenerator from "./Components/ResumeGenerator";

const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const userRes = await axios.get(
          `https://api.github.com/users/${username}`,
          {
            headers: {
              Authorization: `token ${TOKEN}`, // ✅ FIXED
            },
          }
        );

        const repoRes = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=6&sort=updated`,
          {
            headers: {
              Authorization: `token ${TOKEN}`, // ✅ FIXED
            },
          }
        );

        setUser(userRes.data);
        setRepos(repoRes.data);
      } catch (err) {
        console.log("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">

      {/* 🔥 HEADER */}
      <h1 className="text-4xl md:text-5xl font-bold text-center pt-8 mb-8 tracking-wide">
        🚀 DevScope
      </h1>

      {/* 🔍 SEARCH BAR */}
      <div className="flex justify-center mb-10">
        <div className="w-full max-w-xl">
          <SearchBar setUsername={setUsername} />
        </div>
      </div>

      {/* ⏳ LOADING */}
      {loading && (
        <p className="text-center text-gray-400 text-lg">Loading...</p>
      )}

      {/* 👤 PROFILE + SCORE */}
      {user && !loading && (
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          <ProfileCard user={user} />
          <DeveloperScore user={user} repos={repos} />
        </div>
      )}

      {/* 📊 STATS */}
      {repos.length > 0 && !loading && (
        <div className="max-w-5xl mx-auto mb-10">
          <StatsCard repos={repos} />
        </div>
      )}

      {/* 📂 REPOS + 📈 LANGUAGES */}
      {repos.length > 0 && !loading && (
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          <RepoList repos={repos} />
          <LanguageChart repos={repos} />
        </div>
      )}

      {/* ⚔️ COMPARE DEVELOPERS */}
      <div className="max-w-4xl mx-auto mb-16">
        <CompareDevelopers />
      </div>

      {/* 📄 RESUME GENERATOR (NEW 🔥) */}
      {user && repos.length > 0 && !loading && (
        <div className="max-w-4xl mx-auto mb-16">
          <ResumeGenerator user={user} repos={repos} />
        </div>
      )}

    </div>
  );
}

export default App;