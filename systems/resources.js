/**
 * 【资源系统】负责同学：资源组
 * 管理金币、水量、收获数量
 */

window.CampGame = window.CampGame || {};

CampGame.resources = {
  gold: 0,
  water: 0,
  harvestCount: 0,

  /** 用配置初始化资源 */
  init: function () {
    var cfg = CampGame.config;
    this.gold = cfg.initialGold;
    this.water = cfg.initialWater;
    this.harvestCount = cfg.initialHarvestCount;
  },

  /** 重置为初始值 */
  reset: function () {
    this.init();
  },

  /** 检查是否有足够资源 */
  canAfford: function (cost) {
    if (cost.water && this.water < cost.water) return false;
    if (cost.gold && this.gold < cost.gold) return false;
    return true;
  },

  /** 扣除资源，返回是否成功 */
  spend: function (cost) {
    if (!this.canAfford(cost)) return false;
    if (cost.water) this.water -= cost.water;
    if (cost.gold) this.gold -= cost.gold;
    return true;
  },

  /** 增加资源 */
  add: function (reward) {
    if (reward.gold) this.gold += reward.gold;
    if (reward.water) this.water += reward.water;
    if (reward.harvestCount) this.harvestCount += reward.harvestCount;
  },

  /** 记录一次收获 */
  recordHarvest: function () {
    this.harvestCount += 1;
  },

  /** 获取当前资源快照 */
  getState: function () {
    return {
      gold: this.gold,
      water: this.water,
      harvestCount: this.harvestCount,
    };
  },
};
