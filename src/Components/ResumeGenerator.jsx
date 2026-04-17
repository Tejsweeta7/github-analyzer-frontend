import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ResumeGenerator({ user, repos }) {
  const resumeRef = useRef();

  if (!user || !repos) return null;

  // 💻 Skills (languages)
  const languages = [
    ...new Set(repos.map((repo) => repo.language).filter(Boolean)),
  ];

  // ⭐ Total stars
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  // 💻 Language count (IMPORTANT)
  const languageCount = new Set(
    repos.map((repo) => repo.language).filter(Boolean)
  ).size;

  // 🚀 SAME FORMULA (CONSISTENT EVERYWHERE)
  const score = Math.min(
    100,
    Math.floor(
      repos.length * 2 +
      totalStars * 0.5 +
      user.followers * 3 +
      languageCount * 5
    )
  );

  // 🏆 Level (optional)
  const getLevel = (score) => {
    if (score < 40) return "Beginner 🐣";
    if (score < 70) return "Intermediate 🚀";
    if (score < 90) return "Advanced 💻";
    return "Expert 🔥";
  };

  const level = getLevel(score);

  // 📄 Download PDF
  const downloadPDF = async () => {
    const canvas = await html2canvas(resumeRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`${user.login}_resume.pdf`);
  };

  return (
    <div className="mt-10 text-center">

      {/* 📄 BUTTON */}
      <button
        onClick={downloadPDF}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg mb-4 transition"
      >
        📄 Download Resume
      </button>

      <p className="text-gray-400 mb-4">
        Auto-generated from GitHub profile
      </p>

      {/* 📄 RESUME */}
      <div
        ref={resumeRef}
        className="bg-white text-black p-8 rounded-xl w-[750px] mx-auto shadow-xl font-sans"
      >

        {/* HEADER */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={user.avatar_url}
            alt="profile"
            className="w-24 h-24 rounded-full border"
          />

          <div>
            <h1 className="text-3xl font-bold">
              {user.name || user.login}
            </h1>
            <p className="text-gray-600 text-sm">
              {user.bio || "Aspiring Developer"}
            </p>
          </div>
        </div>

        <hr className="my-4" />

        {/* GRID */}
        <div className="grid grid-cols-2 gap-8">

          {/* LEFT */}
          <div>

            <h2 className="font-semibold text-lg mb-2">
              💻 Skills
            </h2>

            <div className="flex flex-wrap gap-2">
              {languages.map((lang, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>

            <hr className="my-4" />

            <h2 className="font-semibold text-lg mb-2">
              📊 Stats
            </h2>
            <p>Repositories: {repos.length}</p>
            <p>Followers: {user.followers}</p>
            <p>Total Stars: {totalStars}</p>

            <hr className="my-4" />

            <h2 className="font-semibold text-lg mb-2">
              🏆 Developer Score
            </h2>
            <p className="text-xl font-bold text-green-600">
              {score} ({level})
            </p>

          </div>

          {/* RIGHT */}
          <div>

            <h2 className="font-semibold text-lg mb-2">
              📁 Projects
            </h2>

            <ul className="space-y-2">
              {repos.slice(0, 6).map((repo) => (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    {repo.name}
                  </a>
                </li>
              ))}
            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResumeGenerator;