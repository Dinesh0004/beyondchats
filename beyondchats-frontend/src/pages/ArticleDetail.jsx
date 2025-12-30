import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const res = await api.get("/articles");
      const found = res.data.find(
        (a) => a.id === Number(id)
      );
      setArticle(found);
    } catch (err) {
      console.error("Failed to load article", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading article...
      </p>
    );
  }

  if (!article) {
    return (
      <p className="text-center mt-20 text-red-500">
        Article not found
      </p>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-50 min-h-screen"
    >
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* BACK LINK */}
        <Link
          to="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Articles
        </Link>

        {/* BADGE */}
        <div className="mt-6">
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
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-900 mt-4 leading-snug">
          {article.title}
        </h1>

        {/* META */}
        <p className="text-sm text-gray-500 mt-2">
          Source: {article.source}
        </p>

        {/* CONTENT */}
        <article className="mt-8 text-gray-800 leading-7 text-base whitespace-pre-line">
          {article.content}
        </article>

        {/* REFERENCES */}
        {article.version === "updated" &&
          article.referenceLinks?.length > 0 && (
            <section className="mt-12 border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Reference Links
              </h3>
              <ul className="list-disc pl-5 text-sm text-blue-600 space-y-2">
                {article.referenceLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
      </div>
    </motion.main>
  );
}
