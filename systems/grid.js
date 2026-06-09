/**
 * Grid system — Grid & Map Team.
 * Stores tile states, renders the map, and handles tile clicks.
 */

window.CampGame = window.CampGame || {};

CampGame.grid = {
  tiles: [],

  init: function () {
    var cfg = CampGame.config;
    var emptyId = cfg.emptyBuildingId;
    var r;
    var c;
    var row;

    this.tiles = [];

    for (r = 0; r < cfg.gridRows; r++) {
      row = [];

      for (c = 0; c < cfg.gridCols; c++) {
        row.push(emptyId);
      }

      this.tiles.push(row);
    }
  },

  reset: function () {
    this.init();
  },

  getTile: function (row, col) {
    return this.tiles[row][col];
  },

  setTile: function (row, col, buildingId) {
    this.tiles[row][col] = buildingId;
  },

  isEmpty: function (row, col) {
    return this.getTile(row, col) === CampGame.config.emptyBuildingId;
  },

  render: function (container) {
    var cfg = CampGame.config;
    var buildingSystem = CampGame.buildings;
    var r;
    var c;
    var buildingId;
    var def;
    var cellEl;

    container.innerHTML = "";

    for (r = 0; r < cfg.gridRows; r++) {
      for (c = 0; c < cfg.gridCols; c++) {
        buildingId = this.getTile(r, c);
        def = buildingSystem.getDefinition(buildingId);

        cellEl = document.createElement("button");
        cellEl.className = "grid-cell grid-cell--" + buildingId;
        cellEl.style.backgroundColor = def.color;
        cellEl.title = def.name + " — " + def.description;

        cellEl.innerHTML =
          '<span class="cell-emoji">' + def.icon + "</span>" +
          '<span class="cell-label">' + def.name + "</span>";

        cellEl.dataset.row = r;
        cellEl.dataset.col = c;

        cellEl.addEventListener("click", function () {
          var row = parseInt(this.dataset.row, 10);
          var col = parseInt(this.dataset.col, 10);

          CampGame.onTileClick(row, col);
        });

        container.appendChild(cellEl);
      }
    }
  },
};
