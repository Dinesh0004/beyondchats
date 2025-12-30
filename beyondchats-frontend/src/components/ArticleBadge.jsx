export default function ArticleBadge({ type }) {
  if (type === "updated") {
    return (
      <span className="px-3 py-1 text-xs font-semibold rounded-full
        bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow">
        🤖 AI Enhanced
      </span>
    );
  }

  return (
    <span className="px-3 py-1 text-xs font-semibold rounded-full
      bg-gray-200 text-gray-700">
      📄 Original
    </span>
  );
}
