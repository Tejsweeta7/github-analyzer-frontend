function StatsCard({ repos }) {

  if (!repos || repos.length === 0) return null;

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  const totalForks = repos.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );

  return (

    <div className="grid grid-cols-3 gap-4 mt-6">

      <div className="bg-yellow-400 p-4 rounded-lg text-center">
        <p className="text-lg font-bold">⭐ {totalStars}</p>
        <p className="text-sm">Stars</p>
      </div>

      <div className="bg-green-400 p-4 rounded-lg text-center">
        <p className="text-lg font-bold">🍴 {totalForks}</p>
        <p className="text-sm">Forks</p>
      </div>

      <div className="bg-orange-400 p-4 rounded-lg text-center">
        <p className="text-lg font-bold">📦 {repos.length}</p>
        <p className="text-sm">Repositories</p>
      </div>

    </div>

  );
}

export default StatsCard;