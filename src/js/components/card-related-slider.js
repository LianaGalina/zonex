import Swiper from '../vendor/swiper.min.js';
import vars from '../_vars';

const cardRelatedSlider = new Swiper(vars.$cardRelatedSlider, {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
        el: '.related-pag',
        type: 'bullets',
        clicable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 4,
        }
      }
});