/**
 * 【成长系统】负责同学：成长组
 * 负责植物从种子 → 幼苗 → 成熟的成长规则
 */

window.CampGame = window.CampGame || {};

CampGame.growth = {
  /** 空地种植后变成种子 */
  plant: function (cellType) {
    var types = CampGame.config.cellTypes;
    if (cellType !== types.EMPTY) return null;
    return types.SEED;
  },

  /** 浇水后进入下一阶段，成熟植物不再变化 */
  water: function (cellType) {
    var types = CampGame.config.cellTypes;
    if (cellType === types.SEED) return types.SEEDLING;
    if (cellType === types.SEEDLING) return types.MATURE;
    return null;
  },

  /** 是否可以浇水（种子或幼苗） */
  canWater: function (cellType) {
    var types = CampGame.config.cellTypes;
    return cellType === types.SEED || cellType === types.SEEDLING;
  },

  /** 是否可以收获 */
  canHarvest: function (cellType) {
    return cellType === CampGame.config.cellTypes.MATURE;
  },

  /** 收获后格子变回空地 */
  harvest: function (cellType) {
    if (!this.canHarvest(cellType)) return null;
    return CampGame.config.cellTypes.EMPTY;
  },
};
