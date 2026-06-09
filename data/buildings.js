/**
 * Building definitions — Building Team / Art Team.
 * Add new buildings here. Most behavior comes from cost and produces.
 */

window.CampGame = window.CampGame || {};

CampGame.buildingDefs = {
  empty: {
    id: "empty",
    name: "Empty",
    icon: "⬜",
    color: "#e8e8e8",
    description: "An empty tile. Select a building, then click here to build.",
    cost: {},
    produces: {},
    buildable: false,
  },

  farm: {
    id: "farm",
    name: "Farm",
    icon: "🌾",
    color: "#c8e6c9",
    description: "Produces food every turn.",
    cost: {
      wood: 2,
    },
    produces: {
      food: 2,
    },
    buildable: true,
  },

  house: {
    id: "house",
    name: "House",
    icon: "🏠",
    color: "#ffe0b2",
    description: "Supports village growth and brings in gold.",
    cost: {
      wood: 2,
      stone: 1,
    },
    produces: {
      gold: 1,
    },
    buildable: true,
  },

  school: {
    id: "school",
    name: "School",
    icon: "🏫",
    color: "#bbdefb",
    description: "Produces knowledge every turn.",
    cost: {
      wood: 3,
      stone: 1,
    },
    produces: {
      knowledge: 1,
    },
    buildable: true,
  },

  mine: {
    id: "mine",
    name: "Mine",
    icon: "⛏️",
    color: "#cfd8dc",
    description: "Produces stone every turn.",
    cost: {
      wood: 2,
    },
    produces: {
      stone: 2,
    },
    buildable: true,
  },

  forest: {
    id: "forest",
    name: "Forest",
    icon: "🌲",
    color: "#a5d6a7",
    description: "Produces wood every turn.",
    cost: {
      food: 1,
    },
    produces: {
      wood: 2,
    },
    buildable: true,
  },

  lab: {
    id: "lab",
    name: "AI Lab",
    icon: "🧪",
    color: "#e1bee7",
    description: "Turns knowledge into AI progress.",
    cost: {
      stone: 3,
      gold: 2,
    },
    produces: {
      knowledge: 2,
    },
    buildable: true,
  },
};

// Buildings shown in the build menu (order matters)
CampGame.buildMenuIds = [
  "farm",
  "house",
  "school",
  "mine",
  "forest",
  "lab",
];
