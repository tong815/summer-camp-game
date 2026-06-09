/**
 * 【格子地图系统】负责同学：地图组
 * 生成格子矩阵、渲染地图、处理格子点击
 */

window.CampGame = window.CampGame || {};

CampGame.grid = {
  cells: [],

  /** 创建空的格子矩阵 */
  init: function () {
    var cfg = CampGame.config;
    this.cells = [];
    for (var r = 0; r < cfg.gridRows; r++) {
      var row = [];
      for (var c = 0; c < cfg.gridCols; c++) {
        row.push(cfg.cellTypes.EMPTY);
      }
      this.cells.push(row);
    }
  },

  reset: function () {
    this.init();
  },

  getCell: function (row, col) {
    return this.cells[row][col];
  },

  setCell: function (row, col, type) {
    this.cells[row][col] = type;
  },

  /** 把地图画到页面上 */
  render: function (container) {
    var cfg = CampGame.config;
    container.innerHTML = "";

    for (var r = 0; r < cfg.gridRows; r++) {
      for (var c = 0; c < cfg.gridCols; c++) {
        var cellType = this.cells[r][c];
        var display = cfg.cellDisplay[cellType];
        var cellEl = document.createElement("button");
        cellEl.className = "grid-cell grid-cell--" + cellType;
        cellEl.style.backgroundColor = display.color;
        cellEl.title = display.label;
        cellEl.innerHTML =
          '<span class="cell-emoji">' + display.emoji + "</span>" +
          '<span class="cell-label">' + display.label + "</span>";
        cellEl.dataset.row = r;
        cellEl.dataset.col = c;
        cellEl.addEventListener("click", function () {
          var row = parseInt(this.dataset.row, 10);
          var col = parseInt(this.dataset.col, 10);
          CampGame.onCellClick(row, col);
        });
        container.appendChild(cellEl);
      }
    }
  },
};
