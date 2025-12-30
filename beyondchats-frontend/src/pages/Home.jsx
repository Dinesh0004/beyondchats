import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

/* ===== Helper: short preview for home page ===== */
const getPreview = (text, wordLimit = 35) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

/* ===== Animation variants ===== */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, [filter]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const url =
        filter === "all"
          ? "/articles"
          : `/articles?version=${filter}`;

      const res = await api.get(url);
      setArticles(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load articles", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            BeyondChats Articles
          </h1>
          <p className="text-gray-600 mt-3">
            Original articles and AI-enhanced rewrites with full transparency.
          </p>

          {/* FILTERS */}
          <div className="flex gap-3 mt-6 flex-wrap">
            {["all", "original", "updated"].map((v) => (
              <button
                key={v}
                onClick={() => setFilter(v)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition
                  ${
                    filter === v
                      ? "bg-black text-white"
                      : "bg-white text-gray-700 border hover:bg-gray-100"
                  }`}
              >
                {v === "all"
                  ? "All Articles"
                  : v === "original"
                  ? "Original"
                  : "AI Updated"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        {loading ? (
          <p className="text-center text-gray-500">
            Loading articles...
          </p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-500">
            No articles found.
          </p>
        ) : (
          <motion.div
            key={filter} /* re-animate on filter change */
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
              >
                <motion.article
                  variants={itemVariants}
                  className="bg-white rounded-xl border p-8 shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  {/* VERSION BADGE */}
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full
                      ${
                        article.version === "updated"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {article.version === "updated"
                      ? "AI UPDATED"
                      : "ORIGINAL"}
                  </span>

                  {/* TITLE */}
                  <h2 className="text-2xl font-bold text-gray-900 mt-4 leading-snug">
                    {article.title}
                  </h2>

                  {/* SHORT PREVIEW */}
                  <p className="text-gray-700 mt-4 leading-6 text-base">
                    {getPreview(article.content)}
                  </p>

                  <span className="inline-block mt-4 text-sm font-medium text-blue-600">
                    Read full article →
                  </span>

                  {/* FOOTER */}
                  <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
                    <span>Source: {article.source}</span>
                    <span>
                      {new Date(
                        article.createdAt || Date.now()
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </motion.article>
              </Link>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}
