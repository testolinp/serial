import Ember from 'ember';

export default Ember.Controller.extend({
  showOverlay: false,

  actions: {
    openCloseOverlay() {
      this.toggleProperty('showOverlay');
    }
  }
});
