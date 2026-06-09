/**
 * Building system — Building Team.
 * Handles selected building and placing buildings on empty tiles.
 */

window.CampGame = window.CampGame || {};

CampGame.buildings = {
  selectedId: null,

  init: function () {
    this.selectedId = null;
  },

  reset: function () {
    this.selectedId = null;
  },

  getDefinition: function (buildingId) {
    return CampGame.buildingDefs[buildingId] || null;
  },

  getBuildMenuList: function () {
    var ids = CampGame.buildMenuIds;
    var list = [];
    var i;

    for (i = 0; i < ids.length; i++) {
      list.push(this.getDefinition(ids[i]));
    }

    return list;
  },

  select: function (buildingId) {
    var def = this.getDefinition(buildingId);

    if (!def || !def.buildable) {
      return false;
    }

    this.selectedId = buildingId;
    return true;
  },

  getSelected: function () {
    if (!this.selectedId) {
      return null;
    }

    return this.getDefinition(this.selectedId);
  },

  clearSelection: function () {
    this.selectedId = null;
  },

  canAfford: function (buildingId) {
    var def = this.getDefinition(buildingId);

    if (!def) {
      return false;
    }

    return CampGame.resources.canAfford(def.cost);
  },

  formatCost: function (cost) {
    var parts = [];
    var key;

    for (key in cost) {
      if (cost.hasOwnProperty(key)) {
        parts.push(key + ": " + cost[key]);
      }
    }

    if (parts.length === 0) {
      return "Free";
    }

    return parts.join(", ");
  },

  /**
   * Try to build on a tile.
   * Returns { success, message }
   */
  buildOnTile: function (row, col) {
    var grid = CampGame.grid;
    var resources = CampGame.resources;
    var emptyId = CampGame.config.emptyBuildingId;
    var selected = this.getSelected();

    if (!selected) {
      return {
        success: false,
        message: "Select a building from the menu first.",
      };
    }

    if (grid.getTile(row, col) !== emptyId) {
      return {
        success: false,
        message: "You can only build on empty tiles.",
      };
    }

    if (!resources.canAfford(selected.cost)) {
      return {
        success: false,
        message: "Not enough resources. Need: " + this.formatCost(selected.cost),
      };
    }

    resources.spend(selected.cost);
    grid.setTile(row, col, selected.id);

    return {
      success: true,
      message: "Built " + selected.name + "!",
    };
  },
};
