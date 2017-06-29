import Ember from 'ember';

export default Ember.Controller.extend({
  slide: {
    show: false,
    index: 0,
    total: 0,
  },

  actions: {
    nextSlide() {
      if(this.get('slide.index') >= this.get('slide.total')) { return; }

      Ember.$('.hd').removeClass().addClass('hd');

      Ember.$('.slide').eq(this.get('slide.index')).addClass('slide--show-out').removeClass('slide--show-in slide--current');
      this.set('slide.index', this.get('slide.index') + 1);
      Ember.$('.slide').eq(this.get('slide.index')).addClass('slide--show-in slide--current');

      Ember.$('.hd').addClass('hd--' + this.get('slide.index'));

      // Ember.$('.home__dots li').removeClass('home__dots__item--active');
      // Ember.$('.home__dots li').eq(this.get('slide.index')).addClass('home__dots__item--active');
    },

    prevSlide() {
      if(this.get('slide.index') <= 0) { return; }

      Ember.$('.hd').removeClass().addClass('hd');

      Ember.$('.slide').eq(this.get('slide.index')).removeClass('slide--show-in slide--current');
      this.set('slide.index', this.get('slide.index') - 1);
      Ember.$('.slide').eq(this.get('slide.index')).removeClass('slide--show-out').addClass('slide--current');

      Ember.$('.hd').addClass('hd--' + this.get('slide.index'));
      // Ember.$('.home__dots li').removeClass('home__dots__item--active');
      // Ember.$('.home__dots li').eq(this.get('slide.index')).addClass('home__dots__item--active');
    },

    // goToSlide(index) {
    //   //console.log('index',this.get('slide.index'),index);
    //   if(this.get('slide.index') === index) { return; }
    //   Ember.$('.home__dots li').removeClass('home__dots__item--active');
    //   Ember.$('.home__dots li').eq(index).addClass('home__dots__item--active');
    //
    //   // TODO: Go to Slide.
    //   if(index === '99999') {
    //     Ember.$('.home__slider__box').removeClass('home__slider__box--show-in home__slider__box--current').addClass('home__slider__box--show-out');
    //     Ember.$('.home__dots li').eq(-1).addClass('home__dots__item--active');
    //     this.set('slide.index',this.get('slide.total'));
    //   } else if (index < this.get('slide.index')) {
    //     //console.log('BACK');
    //       Ember.$('.home__slider__box').eq(this.get('slide.index')).removeClass('home__slider__box--show-in home__slider__box--current');
    //       this.set('slide.index',index);
    //       Ember.$('.home__slider__box').eq(this.get('slide.index')).removeClass('home__slider__box--show-out').addClass('home__slider__box--current');
    //       for(var i=index ; i< this.get('slide.total') ; i++) { Ember.$('.home__slider__box').eq(i).removeClass('home__slider__box--show-out'); }
    //   } else {
    //     //console.log('FORWARD');
    //       for(var e=0 ; e< (index) ; e++) { Ember.$('.home__slider__box').eq(e).addClass('home__slider__box--show-out'); }
    //       Ember.$('.home__slider__box').eq(this.get('slide.index')).addClass('home__slider__box--show-out').removeClass('home__slider__box--show-in home__slider__box--current');
    //       this.set('slide.index', index);
    //       Ember.$('.home__slider__box').eq(this.get('slide.index')).addClass('home__slider__box--show-in home__slider__box--current').removeClass('home__slider__box--show-out');
    //   }
    // },

    showSlider() {
      this.set('slide.show', true);
      // Ember.$('.home').addClass('home--transition');
      // Ember.$('.hd').addClass('hd--active');

      //Ember.$('.slide').eq(0).addClass('slide--current');

      // Ember.run.later(function() {
      //   Ember.$('.home').addClass('home--slider');
      // }, 900);

      // TODO: Dots
      this.set('slide.total', Ember.$('.slide').length - 1);

      //Ember.$('.home__dots li:first').addClass('home__dots__item--active');
    }
  }
});
