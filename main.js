/**
 * Main program — team lead or whole group.
 * Initializes all systems and connects UI events.
 *
 * Game flow (AI Civilization Village):
 *   1. Select building from menu
 *   2. Click empty tile to build
 *   3. Click Next Turn to run production
 *   4. Quest checks win condition
 */

window.CampGame = window.CampGame || {};

/** Wire buttons and build menu clicks */
CampGame.wireEvents = function () {
  var ui = CampGame.ui;

  ui.elements.nextTurnBtn.addEventListener("click", function () {
    CampGame.nextTurn();
  });

  ui.elements.resetBtn.addEventListener("click", function () {
    CampGame.reset();
  });

  ui.elements.buildMenu.addEventListener("click", function (event) {
    var target = event.target;

    while (target && target !== ui.elements.buildMenu) {
      if (target.classList && target.classList.contains("build-btn")) {
        var buildingId = target.getAttribute("data-building-id");
        CampGame.onBuildingSelect(buildingId);
        return;
      }
      target = target.parentNode;
    }
  });
};

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

/** Player clicks Next Turn — run production for all buildings */
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

/** Initialize every subsystem in order */
CampGame.init = function () {
  CampGame.resources.init();
  CampGame.grid.init();
  CampGame.buildings.init();
  CampGame.quest.init();
  CampGame.ui.init();
  CampGame.wireEvents();
};

/** Start the game */
CampGame.start = function () {
  CampGame.init();

  CampGame.ui.showMessage(
    "Welcome to AI Civilization Village! Select a building, click an empty tile, then press Next Turn.",
    true
  );
  CampGame.ui.refresh();
};

document.addEventListener("DOMContentLoaded", function () {
  CampGame.start();
});
