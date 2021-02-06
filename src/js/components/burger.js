import vars from '../_vars';

vars.$burger.addEventListener('click', (e) => {
    vars.$nav.classList.add('nav--visible');
    vars.$body.style.overflow = "hidden";
});

vars.$navClose.addEventListener('click', (e) => {
    vars.$nav.classList.remove('nav--visible');
})