function ProfileCard({ user }) {

  if (!user) return null;

  return (

    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition text-center max-w-sm mx-auto">

      {/* Profile Image */}
      <img
        src={user.avatar_url}
        className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-500"
      />

      {/* Name */}
      <h2 className="text-xl font-bold mt-4">
        {user.name || user.login}
      </h2>

      {/* Username */}
      <p className="text-gray-500">@{user.login}</p>

      {/* Bio */}
      {user.bio && (
        <p className="text-sm text-gray-600 mt-2">
          {user.bio}
        </p>
      )}

      {/* Stats */}
      <div className="flex justify-center gap-6 mt-4 text-sm">

        <div>
          <p className="font-semibold">{user.followers}</p>
          <p className="text-gray-500">Followers</p>
        </div>

        <div>
          <p className="font-semibold">{user.public_repos}</p>
          <p className="text-gray-500">Repos</p>
        </div>

        <div>
          <p className="font-semibold">{user.following}</p>
          <p className="text-gray-500">Following</p>
        </div>

      </div>

      {/* GitHub Button */}
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-5 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
      >
        View GitHub Profile
      </a>

    </div>

  );
}

export default ProfileCard;