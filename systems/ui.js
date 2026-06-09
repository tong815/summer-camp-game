/**
 * UI system — UI / Text / Art Team.
 * Renders resource bar, build menu, messages, and buttons.
 */

window.CampGame = window.CampGame || {};

CampGame.ui = {
  elements: {},

  init: function () {
    this.elements = {
      resourceBar: document.getElementById("resource-bar"),
      buildMenu: document.getElementById("build-menu"),
      selectedBuilding: document.getElementById("selected-building"),
      questText: document.getElementById("quest-text"),
      messageText: document.getElementById("message-text"),
      winBanner: document.getElementById("win-banner"),
      gridContainer: document.getElementById("grid-container"),
      nextTurnBtn: document.getElementById("next-turn-btn"),
      resetBtn: document.getElementById("reset-btn"),
    };

    var self = this;

    this.elements.nextTurnBtn.addEventListener("click", function () {
      CampGame.nextTurn();
    });

    this.elements.resetBtn.addEventListener("click", function () {
      CampGame.reset();
    });

    this.renderBuildMenu();
  },

  renderResourceBar: function () {
    var keys = CampGame.config.resourceKeys;
    var display = CampGame.config.resourceDisplay;
    var state = CampGame.resources.getState();
    var html = "";
    var i;
    var key;
    var info;

    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      info = display[key];

      html += '<div class="stat-item">';
      html += info.icon + " " + info.label + ": ";
      html += '<span id="res-' + key + '">' + state[key] + "</span>";
      html += "</div>";
    }

    this.elements.resourceBar.innerHTML = html;
  },

  renderBuildMenu: function () {
    var buildings = CampGame.buildings.getBuildMenuList();
    var html = "";
    var i;
    var def;
    var costText;

    for (i = 0; i < buildings.length; i++) {
      def = buildings[i];
      costText = CampGame.buildings.formatCost(def.cost);

      html += '<button class="build-btn" data-building-id="' + def.id + '">';
      html += def.icon + " " + def.name;
      html += '<span class="build-cost">(' + costText + ")</span>";
      html += "</button>";
    }

    this.elements.buildMenu.innerHTML = html;

    var buttons = this.elements.buildMenu.querySelectorAll(".build-btn");
    var j;

    for (j = 0; j < buttons.length; j++) {
      buttons[j].addEventListener("click", function () {
        var buildingId = this.getAttribute("data-building-id");
        CampGame.onBuildingSelect(buildingId);
      });
    }
  },

  renderSelectedBuilding: function () {
    var selected = CampGame.buildings.getSelected();
    var el = this.elements.selectedBuilding;

    if (!selected) {
      el.innerHTML = "No building selected. Pick one from the menu above.";
      return;
    }

    var costText = CampGame.buildings.formatCost(selected.cost);

    el.innerHTML =
      selected.icon + " <strong>" + selected.name + "</strong><br>" +
      selected.description + "<br>" +
      "Cost: " + costText + "<br>" +
      "<em>Click an empty tile to build.</em>";
  },

  highlightSelectedBuildButton: function () {
    var selectedId = CampGame.buildings.selectedId;
    var buttons = this.elements.buildMenu.querySelectorAll(".build-btn");
    var i;

    for (i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var btnId = btn.getAttribute("data-building-id");

      if (btnId === selectedId) {
        btn.classList.add("build-btn--active");
      } else {
        btn.classList.remove("build-btn--active");
      }
    }
  },

  updateQuest: function () {
    this.elements.questText.textContent = CampGame.quest.getDescription();

    if (CampGame.quest.isWon()) {
      this.elements.winBanner.classList.remove("hidden");
    } else {
      this.elements.winBanner.classList.add("hidden");
    }
  },

  showMessage: function (text, isSuccess) {
    var el = this.elements.messageText;
    var styleClass = "message";

    if (isSuccess) {
      styleClass += " message--success";
    } else {
      styleClass += " message--error";
    }

    el.textContent = text;
    el.className = styleClass;
  },

  refresh: function () {
    this.renderResourceBar();
    this.renderSelectedBuilding();
    this.highlightSelectedBuildButton();
    this.updateQuest();
    CampGame.grid.render(this.elements.gridContainer);
  },
};
