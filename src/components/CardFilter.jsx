import React from "react";

const TYPES = [
  "Grass", "Fire", "Water",
  "Lightning", "Psychic", "Fighting", "Bug",
  "Darkness", "Metal", "Colorless",
  "Fairy","Dragon" , "Ice" , "Flying" ,
  "Ghost" , "Ground" , "Posion" , "Rock"
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
  Colorless: "/src/assets/type-icons/Normal.png",
  Fairy: "/src/assets/type-icons/fairy.png",
  Ice: "/src/assets/type-icons/ice.png",
  Dragon: "/src/assets/type-icons/dragon.png",
  Flying: "/src/assets/type-icons/flying.png",
  Ghost: "/src/assets/type-icons/ghost.png",
  Ground: "/src/assets/type-icons/ground.png",
  Posion: "/src/assets/type-icons/posion.png",
  Rock: "/src/assets/type-icons/rock.png",
};

const CardFilter = ({ selectedTypes, setSelectedTypes }) => {
  
  const toggleType = (type) => {
    selectedTypes.includes(type)
      ? setSelectedTypes(selectedTypes.filter((t) => t !== type))
      : setSelectedTypes([...selectedTypes, type]);
  };

  return (
    <div className="mt-10 max-w-5xl mx-auto">
      <h3 className="text-white text-2xl font-bold mb-4">
        Choose Your Type
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {TYPES.map((type) => (
          <label
            key={type}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer 
              bg-black/30 border border-white/10 hover:bg-black/50 transition
              ${
                selectedTypes.includes(type)
                  ? "border-yellow-400 bg-yellow-400/20"
                  : ""
              }`}
          >
            <img
              src={typeIcons[type]}
              alt={type}
              className="w-6 h-6"
            />

            <span className="text-white">{type}</span>

            <input
              type="checkbox"
              className="ml-auto w-5 h-5 accent-yellow-400"
              checked={selectedTypes.includes(type)}
              onChange={() => toggleType(type)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default CardFilter;
