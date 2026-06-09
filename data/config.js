/**
 * Global settings — all teams can read this file.
 * Change grid size, starting resources, and win condition here.
 */

window.CampGame = window.CampGame || {};

CampGame.config = {
  // Grid size (rows x columns)
  gridRows: 5,
  gridCols: 5,

  // Default tile when nothing is built
  emptyBuildingId: "empty",

  // Starting resources
  initialResources: {
    food: 5,
    wood: 8,
    stone: 5,
    knowledge: 0,
    gold: 3,
  },

  // Resource keys shown in the UI (order matters)
  resourceKeys: [
    "food",
    "wood",
    "stone",
    "knowledge",
    "gold",
  ],

  // Labels and icons for the resource bar
  resourceDisplay: {
    food: { label: "Food", icon: "🍎" },
    wood: { label: "Wood", icon: "🪵" },
    stone: { label: "Stone", icon: "🪨" },
    knowledge: { label: "Knowledge", icon: "📚" },
    gold: { label: "Gold", icon: "💰" },
  },

  // Win condition: reach this much knowledge
  questTarget: {
    resource: "knowledge",
    amount: 10,
  },

  questDescription: "Reach 10 Knowledge to enter the AI Age.",
};
