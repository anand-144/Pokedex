import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

import { applyTilt } from "../utils/useTilt";
import CardFilter from "./CardFilter";
import { fetchPokemonCards } from "../hooks/pokemonTcgApi";
import "../styles/holo.css";

const PAGE_SIZE = 10;   
const RENDER_BUFFER = 20;   

const PokemonCard = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [search, setSearch] = useState("");

  const [allCards, setAllCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);
  const tiltRefs = useRef([]);

  // 🔥 Fetch next batch of 10 cards
  const loadCards = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await fetchPokemonCards(page, PAGE_SIZE, selectedTypes, search);
      const newCards = response.data;

      setAllCards((prev) => [...prev, ...newCards]);

      const loaded = (page - 1) * PAGE_SIZE + newCards.length;
      setHasMore(loaded < response.total);

      setPage((p) => p + 1);
    } catch (err) {
      console.error("Error loading cards:", err);
    }

    setLoading(false);
  }, [page, search, selectedTypes, loading, hasMore]);

  // 🟢 Initial load
  useEffect(() => {
    loadCards();
  }, [loadCards]);

  // 🔄 Reset when filter/search changes
  useEffect(() => {
    setAllCards([]);
    setVisibleCards([]);
    setPage(1);
    setHasMore(true);
    loadCards();
  }, [selectedTypes, search]);

  // 🟦 SHOW limited cards as user scrolls
  const handleScroll = () => {
    const div = scrollRef.current;
    if (!div) return;

    const scrollRight = div.scrollLeft + div.clientWidth;

    // 1️⃣ Load more data when near end
    if (scrollRight >= div.scrollWidth - 300) {
      loadCards();
    }

    // 2️⃣ Virtualize: keep only closest 20 visible cards
    const cardWidth = 260; // px per card
    const startIndex = Math.max(0, Math.floor(div.scrollLeft / cardWidth) - 2);  
    const endIndex = startIndex + RENDER_BUFFER;

    const slice = allCards.slice(startIndex, endIndex);
    setVisibleCards(slice);
  };

  // Apply tilt
  useEffect(() => {
    visibleCards.forEach((_, i) => {
      if (tiltRefs.current[i]) applyTilt(tiltRefs.current[i]);
    });
  }, [visibleCards]);

  return (
    <div className="w-full bg-[#0b0f2e] py-16 px-4">
      {/* Filters + Search */}
      <CardFilter
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        search={search}
        setSearch={setSearch}
      />

      {/* HORIZONTAL SCROLLER */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-x-auto whitespace-nowrap scrollbar-hide mt-12"
        style={{ height: 420 }}
      >
        <div
          style={{
            width: allCards.length * 260,  // simulate full list width
            height: "100%",
            position: "relative",
          }}
        >
          {/* Render ONLY virtual cards */}
          {visibleCards.map((card, i) => {
            const realIndex = allCards.indexOf(card);
            const left = realIndex * 260;

            return (
              <div
                key={card.id}
                ref={(el) => (tiltRefs.current[i] = el)}
                style={{
                  position: "absolute",
                  left,
                  width: 260,
                }}
              >
                <div className="holo-card rounded-xl w-60 relative">
                  <img src={card.image} alt={card.name} className="rounded-xl" />

                  <div className="text-center mt-2">
                    <p className="text-white font-semibold">{card.name}</p>
                    <p className="text-xs text-yellow-300">
                      {card.types.join(" / ")}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {loading && (
        <p className="text-white text-center mt-4">Loading…</p>
      )}
    </div>
  );
};

export default PokemonCard;
