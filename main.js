/**
 * Main program — team lead or whole group.
 * Starts the game and connects all systems.
 */

window.CampGame = window.CampGame || {};

/** Player selects a building from the menu */
CampGame.onBuildingSelect = function (buildingId) {
  var ok = CampGame.buildings.select(buildingId);

  if (!ok) {
    CampGame.ui.showMessage("That building cannot be selected.", false);
    return;
  }

  var selected = CampGame.buildings.getSelected();
  CampGame.ui.showMessage("Selected: " + selected.name, true);
  CampGame.ui.refresh();
};

/** Player clicks a tile on the map */
CampGame.onTileClick = function (row, col) {
  if (CampGame.quest.isWon()) {
    CampGame.ui.showMessage(
      "You already won! Click Reset Game to play again.",
      true
    );
    return;
  }

  var result = CampGame.buildings.buildOnTile(row, col);

  CampGame.ui.showMessage(result.message, result.success);
  CampGame.ui.refresh();
};

/** Player clicks Next Turn */
CampGame.nextTurn = function () {
  if (CampGame.quest.isWon()) {
    CampGame.ui.showMessage(
      "You already won! Click Reset Game to play again.",
      true
    );
    return;
  }

  var summary = CampGame.production.runTurn();
  CampGame.quest.checkProgress();

  if (CampGame.quest.isWon()) {
    CampGame.ui.showMessage(
      summary + " 🎉 You reached the AI Age! You win!",
      true
    );
  } else {
    CampGame.ui.showMessage(summary, true);
  }

  CampGame.ui.refresh();
};

/** Reset the whole game */
CampGame.reset = function () {
  CampGame.resources.reset();
  CampGame.grid.reset();
  CampGame.buildings.reset();
  CampGame.quest.reset();

  CampGame.ui.showMessage(
    "Game reset. Select a building, place it on the map, then click Next Turn.",
    true
  );
  CampGame.ui.refresh();
};

/** Start the game */
CampGame.start = function () {
  CampGame.resources.init();
  CampGame.grid.init();
  CampGame.buildings.init();
  CampGame.quest.init();
  CampGame.ui.init();

  CampGame.ui.showMessage(
    "Welcome to AI Civilization Village! Select a building, click an empty tile, then press Next Turn.",
    true
  );
  CampGame.ui.refresh();
};

document.addEventListener("DOMContentLoaded", function () {
  CampGame.start();
});
