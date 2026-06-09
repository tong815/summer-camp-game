/**
 * Resource system — Resource Team.
 * Manages food, wood, stone, knowledge, and gold.
 */

window.CampGame = window.CampGame || {};

CampGame.resources = {
  state: {},

  init: function () {
    var initial = CampGame.config.initialResources;
    var keys = CampGame.config.resourceKeys;
    var i;

    this.state = {};

    for (i = 0; i < keys.length; i++) {
      var key = keys[i];
      this.state[key] = initial[key] || 0;
    }
  },

  reset: function () {
    this.init();
  },

  get: function (key) {
    return this.state[key] || 0;
  },

  getState: function () {
    return this.state;
  },

  canAfford: function (cost) {
    var key;

    for (key in cost) {
      if (cost.hasOwnProperty(key)) {
        if (this.get(key) < cost[key]) {
          return false;
        }
      }
    }

    return true;
  },

  spend: function (cost) {
    var key;

    if (!this.canAfford(cost)) {
      return false;
    }

    for (key in cost) {
      if (cost.hasOwnProperty(key)) {
        this.state[key] -= cost[key];
      }
    }

    return true;
  },

  add: function (reward) {
    var key;

    for (key in reward) {
      if (reward.hasOwnProperty(key)) {
        if (this.state[key] === undefined) {
          this.state[key] = 0;
        }
        this.state[key] += reward[key];
      }
    }
  },
};
