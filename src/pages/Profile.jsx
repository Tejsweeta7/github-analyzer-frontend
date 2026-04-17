import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://github-analyzer-backend-znhx.onrender.com";

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${API_BASE_URL}/api/dev/${username}`
      );
      setUser(res.data);
    };

    fetchData();
  }, [username]);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-gray-900 text-white p-6 rounded-xl">
      <h1 className="text-3xl font-bold mb-4">{user.username}</h1>
      <p>Score: {user.score}</p>
      <p>Followers: {user.followers}</p>
      <p>Repos: {user.repos}</p>
      <p className="text-purple-400">Field: {user.field}</p>
    </div>
  );
}

export default Profile;
