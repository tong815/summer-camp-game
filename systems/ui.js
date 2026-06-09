/**
 * 【界面系统】负责同学：界面组
 * 负责页面提示、资源显示、按钮显示
 */

window.CampGame = window.CampGame || {};

CampGame.ui = {
  elements: {},

  init: function () {
    this.elements = {
      gold: document.getElementById("gold-count"),
      water: document.getElementById("water-count"),
      harvest: document.getElementById("harvest-count"),
      quest: document.getElementById("quest-text"),
      message: document.getElementById("message-text"),
      resetBtn: document.getElementById("reset-btn"),
      grid: document.getElementById("grid-container"),
      winBanner: document.getElementById("win-banner"),
    };

    var self = this;
    this.elements.resetBtn.addEventListener("click", function () {
      CampGame.reset();
    });
  },

  /** 更新资源栏和任务栏 */
  updateStats: function () {
    var res = CampGame.resources.getState();
    var quest = CampGame.quest;

    this.elements.gold.textContent = res.gold;
    this.elements.water.textContent = res.water;
    this.elements.harvest.textContent = res.harvestCount;
    this.elements.quest.textContent = quest.getDescription(res.harvestCount);

    if (quest.isWon()) {
      this.elements.winBanner.classList.remove("hidden");
    } else {
      this.elements.winBanner.classList.add("hidden");
    }
  },

  /** 显示操作提示 */
  showMessage: function (text, isSuccess) {
    var el = this.elements.message;
    el.textContent = text;
    el.className = "message " + (isSuccess ? "message--success" : "message--error");
  },

  /** 重新渲染地图并刷新界面 */
  refresh: function () {
    this.elements.grid.innerHTML = "";
    CampGame.grid.render(this.elements.grid);
    this.updateStats();
  },
};
