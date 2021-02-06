import vars from '../_vars';

vars.$cardSliderThumbs.forEach((el) => {
    el.addEventListener('click', (e) => {
        let src = e.target.getAttribute('src');
         
        document.querySelector('.card-slider__main img').setAttribute('src', src);
        
    });
})