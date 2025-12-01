export async function fetchPokemonCards(page = 1, pageSize = 10, types = [], search = "") {
  const params = new URLSearchParams({
    page,
    pageSize,
  });

  if (types.length > 0) params.append("types", types.join(","));
  if (search.trim()) params.append("name", search.trim());

  const url = `http://localhost:3000/api/cards?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch cards from backend");
  }

  return await res.json();
}
