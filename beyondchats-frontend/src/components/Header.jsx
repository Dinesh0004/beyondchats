import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight"
        >
          BeyondChats<span className="text-gray-400">.</span>
        </Link>

        <span className="text-sm text-gray-500">
          AI Article Intelligence
        </span>
      </div>
    </motion.header>
  );
}
