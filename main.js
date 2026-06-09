/**
 * 【主程序】负责同学：组长或全体协作
 * 启动游戏，连接各子系统
 */

window.CampGame = window.CampGame || {};

/** 格子被点击时的统一入口 */
CampGame.onCellClick = function (row, col) {
  if (CampGame.quest.isWon()) {
    CampGame.ui.showMessage("你已经完成任务啦！可以点击「重新开始」再玩一局。", true);
    return;
  }

  var result = CampGame.player.handleCellClick(row, col);
  CampGame.ui.showMessage(result.message, result.success);
  CampGame.ui.refresh();
};

/** 重置整局游戏 */
CampGame.reset = function () {
  CampGame.resources.reset();
  CampGame.grid.reset();
  CampGame.quest.reset();
  CampGame.ui.showMessage("游戏已重置，开始新的种植吧！", true);
  CampGame.ui.refresh();
};

/** 启动游戏 */
CampGame.start = function () {
  CampGame.resources.init();
  CampGame.grid.init();
  CampGame.quest.init();
  CampGame.ui.init();
  CampGame.ui.showMessage("欢迎来到 AI 夏令营农场！点击空地种植，给种子浇水，收获成熟植物。", true);
  CampGame.ui.refresh();
};

// 页面加载完成后启动
document.addEventListener("DOMContentLoaded", function () {
  CampGame.start();
});
