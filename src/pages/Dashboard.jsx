import { useState, useEffect } from "react";
import axios from "axios";

import SearchBar from "../Components/SearchBar";
import CompareDevelopers from "../Components/CompareDevelopers";
import RepoList from "../Components/RepoList";
import LanguageChart from "../Components/LanguageChart";
import ResumeGenerator from "../Components/ResumeGenerator";
import DeveloperScore from "../Components/DeveloperScore";
import ProfileCard from "../Components/ProfileCard";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://github-analyzer-backend-znhx.onrender.com";

function Dashboard() {
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
          `${API_BASE_URL}/api/github/users/${username}`
        );

        const repoRes = await axios.get(
          `${API_BASE_URL}/api/github/repos/${username}?per_page=6&sort=updated`
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
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4">

      {/* 🔥 HERO */}
      <div className="text-center pt-16 mb-10">

        <h1 className="text-5xl font-extrabold tracking-tight mb-3">
          DevScope
        </h1>

        <p className="text-gray-400 mb-6">
          Analyze and compare developers with precision
        </p>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <SearchBar setUsername={setUsername} />
          </div>
        </div>

      </div>

      {/* ⏳ LOADING */}
      {loading && (
        <p className="text-center text-gray-400">Loading...</p>
      )}

      {/* 👤 PROFILE + SCORE FIRST ✅ */}
      {user && !loading && (
        <div className="max-w-5xl mx-auto">

          <div className="grid md:grid-cols-2 gap-8 mb-12">

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <ProfileCard user={user} />
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <DeveloperScore user={user} repos={repos} />
            </div>

          </div>

        </div>
      )}

      {/* 📂 REPOS + LANGUAGES */}
      {repos.length > 0 && !loading && (
        <div className="max-w-5xl mx-auto mb-12 grid md:grid-cols-2 gap-8">

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm">
            <RepoList repos={repos} />
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm">
            <LanguageChart repos={repos} />
          </div>

        </div>
      )}

      {/* ⚔️ COMPARE DEVELOPERS NOW BELOW ✅ */}
      <div className="max-w-3xl mx-auto mb-16">

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-md hover:shadow-lg transition">

          <h2 className="text-xl font-semibold text-center mb-6">
            Compare Developers
          </h2>

          <CompareDevelopers />

        </div>

      </div>

      {/* 📄 RESUME */}
      {user && repos.length > 0 && !loading && (
        <div className="max-w-4xl mx-auto mb-16 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm">
          <ResumeGenerator user={user} repos={repos} />
        </div>
      )}

    </div>
  );
}

export default Dashboard;
