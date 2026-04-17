function RepoList({ repos }) {
  if (!repos || repos.length === 0) return null;

  return (
    <div className="w-full">
      
      {/* 🔥 Heading */}
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        Top Repositories
      </h2>

      {/* 📦 Repo Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {repos.map((repo) => (
          
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-gray-900 border border-purple-500/30 rounded-xl p-5 shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition duration-300 cursor-pointer">

              {/* 🔹 Repo Name */}
              <h3 className="text-xl font-semibold text-purple-400 mb-2">
                {repo.name}
              </h3>

              {/* 🔹 Description */}
              <p className="text-gray-300 text-sm mb-4">
                {repo.description || "No description available"}
              </p>

              {/* 🔹 Stats */}
              <div className="flex justify-between text-sm text-gray-400">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                <span>💻 {repo.language || "N/A"}</span>
              </div>

            </div>
          </a>

        ))}
      </div>
    </div>
  );
}

export default RepoList;