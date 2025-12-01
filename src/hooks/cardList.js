import bulba1 from "../assets/cards/Bulbasaur.png";
import bulba2 from "../assets/cards/Ivysaur.png";
import bulba3 from "../assets/cards/Venusaur.png";

import char1 from "../assets/cards/Charmander.png";
// import char2 from "../assets/cards/Charmeleon.png";
// import char3 from "../assets/cards/Charizard.png";

import squirt1 from "../assets/cards/Squirtle.png";
// import squirt2 from "../assets/cards/Wartortle.png";
// import squirt3 from "../assets/cards/Blastoise.png";

export const cardList = [
  {
    id: 1,
    name: "Bulbasaur",
    evolutionNames: ["Bulbasaur", "Ivysaur", "Venusaur"],
    type: ["Grass"],
    evolutions: [bulba1, bulba2, bulba3],
  },
  {
    id: 2,
    name: "Charmander",
    type: ["Fire"],
    evolutions: [char1],
  },
  {
    id: 3,
    name: "Squirtle",
    type: ["Water"],
    evolutions: [squirt1],
  },
];
