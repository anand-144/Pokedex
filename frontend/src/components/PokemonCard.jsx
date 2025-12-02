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
const CARD_WIDTH = 260;

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

  // Fetch 10 more cards
  const loadCards = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await fetchPokemonCards(page, PAGE_SIZE, selectedTypes, search);
      const newCards = response.data;

      setAllCards((prev) => {
        const merged = [...prev, ...newCards];
        return merged;
      });

      // Set initial visible cards
      if (page === 1) {
        setVisibleCards(newCards.slice(0, RENDER_BUFFER));
      }

      const loaded = (page - 1) * PAGE_SIZE + newCards.length;
      setHasMore(loaded < response.total);

      setPage((p) => p + 1);
    } catch (err) {
      console.error("Error loading cards:", err);
    }

    setLoading(false);
  }, [page, selectedTypes, search, loading, hasMore]);

  // Initial load
  useEffect(() => {
    loadCards();
  }, [loadCards]);

  // Reset on filter/search change
  useEffect(() => {
    setAllCards([]);
    setVisibleCards([]);
    setPage(1);
    setHasMore(true);
    loadCards();
  }, [selectedTypes, search]);

  // Virtualized visibility
  const handleScroll = () => {
    const div = scrollRef.current;
    if (!div) return;

    const scrollRight = div.scrollLeft + div.clientWidth;

    if (scrollRight >= div.scrollWidth - 400) {
      loadCards();
    }

    const startIndex = Math.floor(div.scrollLeft / CARD_WIDTH) - 2;
    const safeStart = Math.max(0, startIndex);
    const endIndex = safeStart + RENDER_BUFFER;

    const slice = allCards.slice(safeStart, endIndex);
    setVisibleCards(slice);
  };

  // Apply tilt effect
  useEffect(() => {
    visibleCards.forEach((_, i) => {
      if (tiltRefs.current[i]) applyTilt(tiltRefs.current[i]);
    });
  }, [visibleCards]);

  return (
    <div className="w-full bg-[#0b0f2e] py-16 px-4">
      
      <CardFilter
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        search={search}
        setSearch={setSearch}
      />

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="smooth-scroll overflow-x-scroll overflow-y-visible no-scrollbar whitespace-nowrap mt-12 pt-7"
        style={{ height: 480 }}
      >
        <div
          style={{
            minWidth: `${allCards.length * CARD_WIDTH}px`,
            width: `${allCards.length * CARD_WIDTH}px`,
            height: "100%",
            position: "relative",
          }}
        >

          {visibleCards.map((card, i) => {
            const globalIndex = allCards.indexOf(card);
            const left = globalIndex * CARD_WIDTH;

            return (
              <div
                key={card.id}
                ref={(el) => (tiltRefs.current[i] = el)}
                style={{
                  position: "absolute",
                  left,
                  width: CARD_WIDTH,
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

      {loading && <p className="text-white text-center mt-4">Loading…</p>}
    </div>
  );
};

export default PokemonCard;
