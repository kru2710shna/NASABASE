// src/api/search.ts
export const searchNASA = async (query: string) => {
  if (!query.trim()) return [];

  try {
    const res = await fetch(`http://127.0.0.1:8000/api/search?query=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("❌ Search API error:", err);
    return [];
  }
};
