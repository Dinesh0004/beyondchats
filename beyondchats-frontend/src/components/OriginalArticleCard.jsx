import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArticleBadge from "./ArticleBadge";

export default function OriginalArticleCard({ article }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl bg-white/80 backdrop-blur p-6 shadow-sm hover:shadow-lg border"
    >
      <Link to={`/articles/${article.id}`}>
        <ArticleBadge type="original" />

        <h2 className="mt-4 text-lg font-semibold text-gray-900 leading-snug">
          {article.title}
        </h2>

        <p className="mt-3 text-sm text-gray-600 line-clamp-3">
          {article.content}
        </p>

        <p className="mt-5 text-xs text-gray-400">
          {article.source}
        </p>
      </Link>
    </motion.div>
  );
}
