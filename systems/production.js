/**
 * Production system — Production Rule Team.
 * Reads each building's produces field and adds resources each turn.
 */

window.CampGame = window.CampGame || {};

CampGame.production = {
  /**
   * Run one production turn for all tiles on the map.
   * Returns a summary string for the message log.
   */
  runTurn: function () {
    var grid = CampGame.grid;
    var resources = CampGame.resources;
    var buildingSystem = CampGame.buildings;
    var cfg = CampGame.config;
    var totalProduced = {};
    var r;
    var c;
    var buildingId;
    var def;
    var key;

    for (r = 0; r < cfg.gridRows; r++) {
      for (c = 0; c < cfg.gridCols; c++) {
        buildingId = grid.getTile(r, c);
        def = buildingSystem.getDefinition(buildingId);

        if (!def || !def.produces) {
          continue;
        }

        resources.add(def.produces);

        for (key in def.produces) {
          if (def.produces.hasOwnProperty(key)) {
            if (!totalProduced[key]) {
              totalProduced[key] = 0;
            }
            totalProduced[key] += def.produces[key];
          }
        }
      }
    }

    return this.formatSummary(totalProduced);
  },

  formatSummary: function (totalProduced) {
    var parts = [];
    var key;

    for (key in totalProduced) {
      if (totalProduced.hasOwnProperty(key)) {
        parts.push("+" + totalProduced[key] + " " + key);
      }
    }

    if (parts.length === 0) {
      return "Nothing was produced this turn.";
    }

    return "Production: " + parts.join(", ");
  },
};
