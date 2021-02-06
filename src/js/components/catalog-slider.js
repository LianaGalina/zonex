import Swiper from '../vendor/swiper.min.js';
import vars from '../_vars';

const cataloglider = new Swiper(vars.$catalogSlider, {
  loop: true,
  containerModifierClass: 'hero-catalog__slider-',
  slidesPerView: 1,
  navigation: {
    nextEl: '.hero-catalog__next',
    prevEl: '.hero-catalog__prev'
  },
  pagination: {
    el: '.catalog-pag',
    type: 'bullets',
    clickable: true,
  }
});

