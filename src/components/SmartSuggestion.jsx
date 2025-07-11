import Link from "next/link";

export default function SmartSuggestion({ photographers, city }) {
  if (!photographers || photographers.length === 0) return null;

  const topRated = [...photographers]
    .filter((p) => p.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="bg-yellow-50 border border-yellow-300 p-4 rounded mb-4">
      <h3 className="text-lg font-semibold mb-2">🧠 Smart Suggestions</h3>
      {topRated.length === 0 ? (
        <p className="text-sm text-gray-600">
          No top-rated photographers found in {city}.
        </p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {topRated.map((p) => (
            <li key={p.id}>
              <Link
                href={`/profile/${p.id}`}
                className="inline-block bg-white border border-gray-200 px-3 py-1 rounded shadow text-sm hover:bg-yellow-100"
              >
                {p.name} ({p.styles[0]}) ⭐ {p.rating}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
