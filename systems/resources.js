/**
 * Resource system — Resource Team.
 * Manages dynamic resources: food, wood, stone, knowledge, gold.
 * Resource types come from data/config.js (resourceKeys).
 */

window.CampGame = window.CampGame || {};

CampGame.resources = {
  state: {},

  /** Load resource keys from config */
  getKeys: function () {
    return CampGame.config.resourceKeys.slice();
  },

  /** Make sure a resource key exists in state */
  ensureKey: function (key) {
    if (this.state[key] === undefined) {
      this.state[key] = 0;
    }
  },

  init: function () {
    var initial = CampGame.config.initialResources;
    var keys = this.getKeys();
    var i;
    var key;

    this.state = {};

    for (i = 0; i < keys.length; i++) {
      key = keys[i];

      if (initial[key] !== undefined) {
        this.state[key] = initial[key];
      } else {
        this.state[key] = 0;
      }
    }
  },

  reset: function () {
    this.init();
  },

  get: function (key) {
    this.ensureKey(key);
    return this.state[key];
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
        this.ensureKey(key);
        this.state[key] -= cost[key];
      }
    }

    return true;
  },

  add: function (reward) {
    var key;

    for (key in reward) {
      if (reward.hasOwnProperty(key)) {
        this.ensureKey(key);
        this.state[key] += reward[key];
      }
    }
  },
};
