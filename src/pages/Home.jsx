import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <div className="flex flex-col justify-center items-center text-center pt-40 pb-24 px-4 relative z-10">

        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          🚀 DevScope
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-400 text-lg md:text-xl mb-8 max-w-xl"
        >
          Analyze, compare and build your developer profile with powerful insights and beautiful visualizations.
        </motion.p>

        <motion.button
          onClick={() => navigate("/dashboard")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-pink-500/30 transition"
        >
          Get Started
        </motion.button>

      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 pb-24 relative z-10">

        {[
          {
            title: "📊 Analytics",
            desc: "Deep insights into repos, stars, and developer activity."
          },
          {
            title: "⚔️ Compare",
            desc: "Compare developers with smart scoring and graphs."
          },
          {
            title: "📄 Resume",
            desc: "Generate professional resumes instantly from GitHub."
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-xl hover:shadow-purple-500/20 transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {item.desc}
            </p>
          </motion.div>
        ))}

      </div>

      {/* CTA */}
      <div className="text-center pb-24 relative z-10">

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold mb-6"
        >
          Ready to level up your profile?
        </motion.h2>

        <motion.button
          onClick={() => navigate("/dashboard")}
          whileHover={{ scale: 1.1 }}
          className="bg-purple-600 px-8 py-3 rounded-xl shadow-lg hover:shadow-purple-500/30 transition"
        >
          Explore Dashboard
        </motion.button>

      </div>

    </div>
  );
}

export default Home;