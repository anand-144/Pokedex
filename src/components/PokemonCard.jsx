import React, { useRef, useState, useEffect } from "react";
import { applyTilt } from "../utils/useTilt";
import { cardList } from "../hooks/cardList";
import CardFilter from "./CardFilter";
import "../styles/holo.css";

const PokemonCard = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const filteredCards =
    selectedTypes.length === 0
      ? cardList
      : cardList.filter((card) =>
          card.type.some((t) => selectedTypes.includes(t))
        );

  const refs = useRef([]);

  useEffect(() => {
    refs.current.forEach((el) => {
      if (el) applyTilt(el);
    });
  }, [filteredCards]);

  return (
    <div
      id="pokemon-section"
      className="w-full bg-[#0b0f2e] py-16 px-4"
    >
      <h2 className="text-center text-4xl font-bold text-white mb-8">
        Holo Cards
      </h2>

      <CardFilter selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {filteredCards.map((card, i) => (
          <div key={card.id} className="flex justify-center">
            <div
              ref={(el) => (refs.current[i] = el)}
              className="holo-card w-52 sm:w-60 md:w-64 lg:w-72 relative rounded-xl"
            >
              <img src={card.image} alt="Card" className="rounded-xl" />

              <div className="holo-rainbow" />
              <div className="holo-noise" />
              <div className="holo-sweep" />
              <div className="tilt-glow" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
