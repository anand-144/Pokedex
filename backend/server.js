import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());

// Path to cards folder
const cardsFolder = path.join(process.cwd(), "data", "cards", "en");

// Combine all card files
let allCards = [];

try {
  const files = fs.readdirSync(cardsFolder);

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const fullPath = path.join(cardsFolder, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const json = JSON.parse(raw);

      // Every file contains an array of cards
      if (Array.isArray(json)) {
        allCards.push(...json);
      }
    }
  });

  console.log(`Loaded ${allCards.length} cards from ${files.length} files.`);
} catch (err) {
  console.error("ERROR LOADING CARDS:", err);
}

// API route
app.get("/api/cards", (req, res) => {
  let { page = 1, pageSize = 30, types, name } = req.query;

  let filtered = [...allCards];

  // Filter by Pokémon type
  if (types) {
    const t = types.split(",");
    filtered = filtered.filter((card) =>
      card.types?.some((x) => t.includes(x))
    );
  }

  // Search by name
  if (name) {
    const q = name.toLowerCase();
    filtered = filtered.filter((c) =>
      c.name.toLowerCase().includes(q)
    );
  }

  // Pagination
  page = Number(page);
  pageSize = Number(pageSize);

  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  res.json({
    page,
    pageSize,
    total: filtered.length,
    data: paginated.map((card) => ({
      id: card.id,
      name: card.name,
      types: card.types || [],
      image:
        card.images?.large ||
        card.images?.small ||
        "",
    })),
  });
});

// Start server
app.listen(3000, () =>
  console.log("Backend running at http://localhost:3000")
);
