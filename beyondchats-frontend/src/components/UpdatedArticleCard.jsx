import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArticleBadge from "./ArticleBadge";

export default function UpdatedArticleCard({ article }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="relative rounded-2xl p-[2px]
      bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400"
    >
      <div className="rounded-2xl bg-white p-6 h-full">
        <Link to={`/articles/${article.id}`}>
          <ArticleBadge type="updated" />

          <h2 className="mt-4 text-lg font-bold text-gray-900">
            {article.title}
          </h2>

          <p className="mt-3 text-sm text-gray-700 line-clamp-4">
            {article.content}
          </p>

          <div className="mt-5 flex justify-between text-xs text-gray-500">
            <span>AI Rewritten</span>
            <span>{article.source}</span>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
