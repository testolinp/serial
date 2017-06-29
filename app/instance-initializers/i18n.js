import Ember from 'ember';
import ENV from '../config/environment';

export default {
  name: 'i18n',

  initialize: function(container) {
    let router = container.lookup('router:main');
    let i18n = container.lookup('service:i18n');

    let newPath = '';
    let path = window.location.pathname;

    // FOR DEBUG
    var LangFromPath = path.match('^/([a-z]{2})(?:/|$)');

    if (LangFromPath && LangFromPath[1]){
      if (Ember.get(ENV, 'i18n.allowedLocales').indexOf(LangFromPath[1]) > -1) {
        router.rootURL = '/' + LangFromPath[1] + '/';
        i18n.set('locale', LangFromPath[1]);
        Ember.$('body').addClass(LangFromPath[1]);
      }
    }
  }
};
