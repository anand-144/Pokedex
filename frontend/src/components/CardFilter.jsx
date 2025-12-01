import React from "react";

const TYPES = [
  "Grass", "Fire", "Water",
  "Lightning", "Psychic", "Fighting", "Bug",
  "Darkness", "Metal", "Colorless",
  "Fairy", "Dragon", "Ice", "Flying",
  "Ghost", "Ground", "Poison", "Rock"
];

const typeIcons = {
  Grass: "/src/assets/type-icons/leaf.png",
  Fire: "/src/assets/type-icons/fire.png",
  Water: "/src/assets/type-icons/water.png",
  Lightning: "/src/assets/type-icons/electric.png",
  Psychic: "/src/assets/type-icons/psyhic.png",
  Fighting: "/src/assets/type-icons/fighting.png",
  Bug: "/src/assets/type-icons/bug.png",
  Darkness: "/src/assets/type-icons/dark.png",
  Metal: "/src/assets/type-icons/steal.png",
  Colorless: "/src/assets/type-icons/normal.png",
  Fairy: "/src/assets/type-icons/fairy.png",
  Ice: "/src/assets/type-icons/ice.png",
  Dragon: "/src/assets/type-icons/dragon.png",
  Flying: "/src/assets/type-icons/flying.png",
  Ghost: "/src/assets/type-icons/ghost.png",
  Ground: "/src/assets/type-icons/ground.png",
  Poison: "/src/assets/type-icons/posion.png",
  Rock: "/src/assets/type-icons/rock.png",
};

const CardFilter = ({ selectedTypes, setSelectedTypes, search, setSearch }) => {
  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="mt-4 max-w-5xl mx-auto">

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search Pokémon by name..."
        className="w-full mb-4 px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3 className="text-white text-2xl font-bold mb-4">
        Filter by Energy Type
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {TYPES.map((type) => {
          const isActive = selectedTypes.includes(type);

          return (
            <label
              key={type}
              className={`flex justify-between items-center px-4 py-2 rounded-lg cursor-pointer 
                bg-black/30 border border-white/10 hover:bg-black/50 transition
                ${isActive ? "border-yellow-400 bg-yellow-400/20" : ""}`}
            >
              <div className="flex items-center gap-2">
                <img src={typeIcons[type]} className="w-6 h-6" />
                <span className="text-white font-medium">{type}</span>
              </div>

              <input
                type="checkbox"
                className="w-5 h-5 accent-yellow-400"
                checked={isActive}
                onChange={() => toggleType(type)}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CardFilter;
