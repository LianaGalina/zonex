// import Swiper from '../vendor/swiper.min.js';
import Swiper from '../vendor/swiper.min.js';
import vars from '../_vars';

const bannerSlider = new Swiper(vars.$bunnerSlider, {
    loop: true,
    containerModifierClass: 'banner__slider-',
    slidePerView: 1,
    pagination: {
        el: '.banner-pag',
        type: 'bullets',
        clickable: true,
      },
});