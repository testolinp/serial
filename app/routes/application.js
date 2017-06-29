import Ember from 'ember';

const {inject} = Ember;

export default Ember.Route.extend({
  i18n: inject.service(),

  setupController: function(controller, model) {
    controller.set('currentLocation', model.lang);
  },

  model() {
    return {
      lang: this.get('i18n').get('locale')
    }
  }
});
