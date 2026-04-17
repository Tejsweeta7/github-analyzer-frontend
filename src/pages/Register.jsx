import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://github-analyzer-backend-znhx.onrender.com";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      alert("Please fill in username, email, and password.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        email,
        password,
      });

      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data || "Unable to register. Please try again.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      
      <div className="bg-slate-800/70 backdrop-blur-lg p-8 rounded-2xl w-[320px] text-center shadow-xl border border-slate-700">
        
        <h1 className="text-indigo-400 text-2xl font-bold mb-2">🚀 DevScope</h1>
        <h2 className="text-white text-xl mb-4">Create Account</h2>

        <input
          className="w-full p-3 mb-3 rounded-lg bg-slate-900 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full p-3 mb-3 rounded-lg bg-slate-900 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-3 rounded-lg bg-slate-900 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold hover:scale-105 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-slate-300 mt-3 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
