// utils/devScore.js

export function calculateScore(user, repos) {
  if (!user || !repos) return 0;

  // ⭐ Total Stars
  const totalStars = repos.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0
  );

  // 💻 Unique Languages
  const languages = new Set(
    repos.map((repo) => repo.language).filter(Boolean)
  );

  const languageCount = languages.size;

  // 🎯 Final Score Formula
  const score = Math.min(
    100,
    Math.floor(
      repos.length * 2 +
      totalStars * 0.5 +
      user.followers * 2 +
      languageCount * 5
    )
  );

  return score;
}

// 🏆 Level Function
export function getLevel(score) {
  if (score < 40) return "Beginner";
  if (score < 70) return "Intermediate";
  if (score < 90) return "Advanced";
  return "Expert";
}