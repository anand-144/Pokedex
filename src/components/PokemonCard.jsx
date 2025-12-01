// src/components/PokemonCard.jsx
import React, { useRef, useState, useEffect } from "react";
import { applyTilt } from "../utils/useTilt";
import { cardList } from "../hooks/cardList";
import CardFilter from "./CardFilter";
import "../styles/holo.css";

const PokemonCard = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Active evolution stage per card (0,1,2…)
  const [activeStage, setActiveStage] = useState(() => {
    const init = {};
    cardList.forEach((c) => (init[c.id] = 0));
    return init;
  });

  // Which card is evolving + from which stage
  // example value: { cardId: 1, fromStage: 0 }
  const [evolvingInfo, setEvolvingInfo] = useState(null);

  // Filter cards by type
  const filteredCards =
    selectedTypes.length === 0
      ? cardList
      : cardList.filter((card) =>
          card.type.some((t) => selectedTypes.includes(t))
        );

  // Tilt references
  const tiltRefs = useRef([]);

  useEffect(() => {
    tiltRefs.current.forEach((el) => el && applyTilt(el));
  }, [filteredCards]);

  const handleStageChange = (cardId, newStage) => {
    const currentStage = activeStage[cardId];

    // If same stage → do nothing
    if (newStage === currentStage) return;

    // Going BACK (Stage 3 → 2 or 2 → 1): no animation, just switch
    if (newStage < currentStage) {
      setActiveStage((prev) => ({
        ...prev,
        [cardId]: newStage,
      }));
      setEvolvingInfo(null);
      return;
    }

    // Going FORWARD (Stage 1 → 2, 2 → 3): show evo animation + message
    setEvolvingInfo({ cardId, fromStage: currentStage });

    // Change card image slightly after animation begins
    setTimeout(() => {
      setActiveStage((prev) => ({
        ...prev,
        [cardId]: newStage,
      }));
    }, 150); // sync with your flip/rumble

    // Stop message + rumble
    setTimeout(() => {
      setEvolvingInfo(null);
    }, 900); // matches .evolve-anim duration
  };

  return (
    <div id="pokemon-section" className="w-full bg-[#0b0f2e] py-16 px-4">
      <CardFilter
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
      />

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {filteredCards.map((card, index) => {
          const stageIndex = activeStage[card.id];
          const currentImage = card.evolutions[stageIndex];

          const isEvolving =
            evolvingInfo && evolvingInfo.cardId === card.id;

          // Name of the form that is evolving (current form BEFORE change)
          const evolvingName =
            isEvolving
              ? card.evolutionNames[evolvingInfo.fromStage]
              : "";

          return (
            <div key={card.id} className="flex flex-col items-center gap-4">
              {/* Tilt wrapper */}
              <div
                ref={(el) => (tiltRefs.current[index] = el)}
                className="tilt-wrapper"
              >
                <div
                  className={`holo-card rounded-xl w-52 sm:w-60 md:w-64 lg:w-72 relative ${
                    isEvolving ? "evolve-anim" : ""
                  }`}
                >
                  <img
                    src={currentImage}
                    alt={card.name}
                    className="rounded-xl"
                  />

                  {/* Floating holographic particles */}
                  <div className="holo-particles">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span
                        key={i}
                        style={{
                          left: `${Math.random() * 90}%`,
                          top: `${Math.random() * 90}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                      ></span>
                    ))}
                  </div>

                  <div className="holo-rainbow"></div>
                  <div className="holo-noise"></div>
                  <div className="holo-sweep"></div>
                  <div className="tilt-glow"></div>

                  {/* 🎮 GameBoy-style message */}
                  {isEvolving && (
                    <div className="evo-message">
                      <p className="evo-text">
                        What? {evolvingName.toUpperCase()} is evolving!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Evolution Buttons */}
              <div className="flex gap-3">
                {card.evolutions.map((_, evoIndex) => (
                  <button
                    key={evoIndex}
                    onClick={() => handleStageChange(card.id, evoIndex)}
                    className={`px-3 py-1 rounded-md text-sm text-white transition ${
                      stageIndex === evoIndex
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-600 hover:bg-gray-700"
                    }`}
                  >
                    Stage {evoIndex + 1}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonCard;
