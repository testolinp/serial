import Ember from 'ember';

export default Ember.Route.extend({
  eventWheel: 'wheel',
  lastMovement: new Date().getTime(),
  touches: { "touchstart": {"x":-1, "y":-1}, "touchmove" : {"x":-1, "y":-1} },

  init() {
      this._super(...arguments);
      this.set('boundHandleStart', this.get('handleStart').bind(this));
      this.set('boundHandleMove', this.get('handleMove').bind(this));
      this.set('boundHandleEnd', this.get('handleEnd').bind(this));
      this.set('boundHandleScroll', this.get('handleScroll').bind(this));
  },

  setupController: function(controller, model) {
    this._super(controller, model);

    controller.set('slide.show', false);
    controller.set('slide.index', 0);
    //controller.set('homeAnimation', this.get('homeAnimation'));
    this.set('controller',controller);
  },

  checkMovement: function(amount, minimumTime) {
    this.get('controller').send('showSlider');

    //console.log('checkMovement', amount, minimumTime, this.get('controller').get('slide.show'));
    let now = new Date().getTime();

    if((now - this.get('lastMovement')) > minimumTime && Math.abs(amount) > 3) {
      //console.log('checkMovement', amount, minimumTime);
      this.set('lastMovement', now);

      if(amount > 0) {
        if(this.get('controller').get('slide.show')) { this.get('controller').send('prevSlide'); }
      } else if(amount < 0) {
        if(!this.get('controller').get('slide.show')) {
          this.get('controller').send('showSlider');
        } else {
          this.get('controller').send('nextSlide');
        }
      }
    }
  },

  handleStart: function(evt) {
    this.set('touches.touchstart.x', evt.touches[0].pageX);
    this.set('touches.touchstart.y', evt.touches[0].pageY);
  },

  handleMove: function(evt) {
      this.set('touches.touchmove.x', evt.touches[0].pageX);
      this.set('touches.touchmove.y', evt.touches[0].pageY);
  },

  handleEnd: function(evt) {
      let diff = this.get('touches.touchmove.y') - this.get('touches.touchstart.y');
      //console.log('handleEnd',diff);
      if(Math.abs(diff) > 80 && this.get('touches.touchmove.y') !== -1) {
        this.checkMovement(diff, 0);
      } else {
        //console.log('CLICK',evt);
        let touch = evt.changedTouches[0];
        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        touch.target.dispatchEvent(simulatedEvent);
        evt.preventDefault();
        evt.stopPropagation();
      }
      this.set('touches', { "touchstart": {"x":-1, "y":-1}, "touchmove" : {"x":-1, "y":-1} });
      return true;
  },

  handleScroll: function(event) {
    let normalized;

    if (event.wheelDelta) {
        normalized = (event.wheelDelta % 120 - 0) === -0 ? event.wheelDelta / 120 : event.wheelDelta / 12;
    } else {
        var rawAmmount = event.deltaY ? event.deltaY : event.detail;
        normalized = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
    }

    this.checkMovement(normalized, 1500);
  },

  // deactivate() {
  //   window.removeEventListener(this.get('eventWheel'), this.get('boundHandleScroll'), false);
  //   window.removeEventListener("touchstart", this.get('boundHandleStart'), false);
  //   window.removeEventListener("touchend", this.get('boundHandleEnd'), false);
  //   window.removeEventListener("touchmove", this.get('boundHandleMove'), false);
  // },

  activate() {
    // if(this.get('first')) {
    //   Ember.run.later(function() {
    //     Ember.$('.home').addClass('home--init');
    //   }, 3500);
    //
    //   this.set('first', false);
    // } else {
    //   this.set('homeAnimation', true);
    //   Ember.run.later(function() {
    //     Ember.$('.home').addClass('home--init');
    //   }, 200);
    // }

    this.set('eventWheel', 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll');

    window.addEventListener(this.get('eventWheel'), this.get('boundHandleScroll'), false);
    window.addEventListener("touchstart", this.get('boundHandleStart'), false);
    window.addEventListener("touchend", this.get('boundHandleEnd'), false);
    window.addEventListener("touchmove", this.get('boundHandleMove'), false);

  },

  model() {
    return {
      first: 0,
      sliders: 4
    };
  }
});
