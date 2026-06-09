/**
 * Quest system — Quest & Progress Team.
 * Tracks progress toward the win condition.
 */

window.CampGame = window.CampGame || {};

CampGame.quest = {
  completed: false,

  init: function () {
    this.completed = false;
  },

  reset: function () {
    this.init();
  },

  getTargetResource: function () {
    return CampGame.config.questTarget.resource;
  },

  getTargetAmount: function () {
    return CampGame.config.questTarget.amount;
  },

  getCurrentProgress: function () {
    var resourceKey = this.getTargetResource();
    return CampGame.resources.get(resourceKey);
  },

  checkProgress: function () {
    if (this.completed) {
      return true;
    }

    if (this.getCurrentProgress() >= this.getTargetAmount()) {
      this.completed = true;
      return true;
    }

    return false;
  },

  isWon: function () {
    return this.completed;
  },

  getDescription: function () {
    var current = this.getCurrentProgress();
    var target = this.getTargetAmount();
    var resource = this.getTargetResource();

    return CampGame.config.questDescription +
      " (" + current + " / " + target + " " + resource + ")";
  },
};
