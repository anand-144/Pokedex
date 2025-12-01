import React, { useRef } from "react";
import { useTilt } from "../utils/useTilt";
import { cardList } from "../hooks/cardList"; // ← IMPORT HERE
import "../styles/holo.css";

const PokemonCard = () => {

  return (
    <div
      id="pokemon-section"
      className="w-full bg-[#0b0f2e] py-16 px-4 sm:py-20 sm:px-6 md:py-24 md:px-10"
    >
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12">
        Holo Cards
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {cardList.map((card) => {
          const tiltRef = useRef(null);
          useTilt(tiltRef);

          return (
            <div key={card.id} className="flex justify-center">

              <div
                ref={tiltRef}
                className="holo-card w-52 sm:w-60 md:w-64 lg:w-72 relative"
              >
                <img
                  src={card.image}
                  alt="Card"
                  className="rounded-xl w-full h-auto"
                />

                <div className="holo-rainbow"></div>
                <div className="holo-noise"></div>
                <div className="holo-sweep"></div>
                <div className="tilt-glow"></div>
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default PokemonCard;
