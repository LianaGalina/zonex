import vars from '../_vars';

vars.$burger.addEventListener('click', (e) => {
    vars.$nav.classList.add('nav--visible');
    if (vars.$nav.classList.contains('nav--visible')) {
        vars.$body.style.overflow = "hidden";
    }
});

vars.$navClose.addEventListener('click', (e) => {
    vars.$nav.classList.remove('nav--visible');
    if (vars.$nav.classList.contains('nav--visible')) {
        vars.$body.style.overflow = "hidden";
    } else 
    vars.$body.style.overflow = "scroll";
});





