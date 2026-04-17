import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="fixed top-0 w-full flex justify-between items-center px-8 py-4 bg-gray-950 border-b border-gray-800 backdrop-blur-md z-50">

      {/* LOGO */}
      <h1 className="text-xl font-bold text-white">
        🚀 DevScope
      </h1>

      {/* NAV LINKS */}
      <div className="flex gap-6 text-gray-400 items-center">

        <Link to="/" className="hover:text-blue-400 transition">
          Home
        </Link>

        <Link to="/dashboard" className="hover:text-blue-400 transition">
          Dashboard
        </Link>

        {/* 🔥 LOGIN BUTTON */}
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>

      </div>

    </div>
  );
}

export default Navbar;