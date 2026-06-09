/**
 * 【玩家操作系统】负责同学：可与其他组协作
 * 处理玩家点击格子时的操作逻辑（种植、浇水、收获）
 */

window.CampGame = window.CampGame || {};

CampGame.player = {
  /**
   * 处理格子点击，返回操作结果供 UI 显示提示
   * @returns {{ success: boolean, message: string }}
   */
  handleCellClick: function (row, col) {
    var grid = CampGame.grid;
    var resources = CampGame.resources;
    var growth = CampGame.growth;
    var quest = CampGame.quest;
    var config = CampGame.config;
    var types = config.cellTypes;

    var cellType = grid.getCell(row, col);

    // 空地 → 种植
    if (cellType === types.EMPTY) {
      if (!resources.canAfford(config.plantCost)) {
        return { success: false, message: "水量不足，无法种植！" };
      }
      resources.spend(config.plantCost);
      grid.setCell(row, col, growth.plant(cellType));
      return { success: true, message: "成功种植！消耗 1 点水。" };
    }

    // 种子/幼苗 → 浇水
    if (growth.canWater(cellType)) {
      if (!resources.canAfford(config.waterCost)) {
        return { success: false, message: "水量不足，无法浇水！" };
      }
      var nextType = growth.water(cellType);
      resources.spend(config.waterCost);
      grid.setCell(row, col, nextType);
      var stageName = nextType === types.SEEDLING ? "幼苗" : "成熟植物";
      if (nextType === types.MATURE) {
        return { success: true, message: "浇水成功！植物已成熟，可以收获了！" };
      }
      return { success: true, message: "浇水成功！植物成长为" + stageName + "。" };
    }

    // 成熟植物 → 收获
    if (growth.canHarvest(cellType)) {
      grid.setCell(row, col, growth.harvest(cellType));
      resources.add(config.harvestReward);
      resources.recordHarvest();
      var count = resources.harvestCount;
      quest.checkProgress(count);
      if (quest.isWon()) {
        return {
          success: true,
          message: "收获成功！获得 " + config.harvestReward.gold + " 金币。🎉 恭喜完成任务！",
        };
      }
      return {
        success: true,
        message: "收获成功！获得 " + config.harvestReward.gold + " 金币。（" + count + "/" + quest.target + "）",
      };
    }

    return { success: false, message: "这里暂时无法操作。" };
  },
};
