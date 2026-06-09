/**
 * 【配置系统】负责同学：全体可读，修改前请和小组讨论
 * 存放地图大小、初始资源、植物阶段等游戏配置
 */

window.CampGame = window.CampGame || {};

CampGame.config = {
  // 地图大小（行 × 列）
  gridRows: 5,
  gridCols: 5,

  // 玩家初始资源
  initialGold: 10,
  initialWater: 5,
  initialHarvestCount: 0,

  // 格子类型
  cellTypes: {
    EMPTY: "empty",
    SEED: "seed",
    SEEDLING: "seedling",
    MATURE: "mature",
  },

  // 每种格子的显示文字和颜色
  cellDisplay: {
    empty: { label: "空地", emoji: "⬜", color: "#e8e8e8" },
    seed: { label: "种子", emoji: "🌱", color: "#c8e6c9" },
    seedling: { label: "幼苗", emoji: "🌿", color: "#a5d6a7" },
    mature: { label: "成熟", emoji: "🌻", color: "#fff176" },
  },

  // 种植和浇水消耗
  plantCost: { water: 1 },
  waterCost: { water: 1 },

  // 收获奖励
  harvestReward: { gold: 3 },

  // 任务目标：收获多少个植物算胜利
  questTarget: 3,
};
