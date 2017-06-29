import Ember from 'ember';

export default Ember.Controller.extend({
  home: Ember.inject.controller(),
  showOverlay: false,

  actions: {
    goToSlide(mode) {
      this.get('home').send('goToSlide', mode);
    },

    menuGoToSlide(mode) {
      this.set('showOverlay', false);
      this.get('home').send('goToSlide', mode);
    },

    openCloseOverlay() {
      this.toggleProperty('showOverlay');
    }
  }
});
