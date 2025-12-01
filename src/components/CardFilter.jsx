import React from "react";

const TYPES = [
  "Grass", "Fire", "Water",
  "Lightning", "Psychic", "Fighting",
  "Darkness", "Metal", "Colorless",
  "Fairy", "Dragon"
];

const CardFilter = ({ selectedTypes, setSelectedTypes }) => {
  
  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      // remove type
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      // add type
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="mt-10 max-w-5xl mx-auto">
      <h3 className="text-white text-2xl font-bold mb-4">Filter by Energy Type</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {TYPES.map((type) => (
          <label
            key={type}
            className={`flex justify-between items-center px-4 py-2 rounded-lg cursor-pointer 
              bg-black/30 border border-white/10 hover:bg-black/50 transition
              ${selectedTypes.includes(type) ? "border-yellow-400 bg-yellow-400/20" : ""}`}
          >
            <span className="text-white font-medium">{type}</span>

            <input
              type="checkbox"
              className="w-5 h-5 accent-yellow-400"
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
