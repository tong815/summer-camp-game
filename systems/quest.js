/**
 * 【任务系统】负责同学：任务组
 * 负责任务进度和胜利判断
 */

window.CampGame = window.CampGame || {};

CampGame.quest = {
  target: 0,
  completed: false,

  init: function () {
    this.target = CampGame.config.questTarget;
    this.completed = false;
  },

  reset: function () {
    this.init();
  },

  /** 每次收获后检查是否达成目标 */
  checkProgress: function (harvestCount) {
    if (this.completed) return true;
    if (harvestCount >= this.target) {
      this.completed = true;
      return true;
    }
    return false;
  },

  /** 获取任务描述文字 */
  getDescription: function (harvestCount) {
    return "任务：收获 " + this.target + " 个植物（当前 " + harvestCount + " / " + this.target + "）";
  },

  isWon: function () {
    return this.completed;
  },
};
