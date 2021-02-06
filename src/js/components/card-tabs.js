import vars from '../_vars';
if (vars.$cardDescription){
    vars.$cardDescription.addEventListener('click', (e) => {
        let target = e.target;
        if (target.classList.contains('card-description__link')){
            e.preventDefault();
    
            vars.$cardDescription.querySelectorAll('.card-description__link').forEach(el => {
                el.classList.remove('card-description__link--active');
            });
            target.classList.add('card-description__link--active');
    
            let targetHref = target.getAttribute('href');
    
            vars.$cardDescription.querySelectorAll('.card-description__content').forEach(el => {
                el.classList.remove('card-description__content--active');
            });
    
            document.querySelector(`[data-target="${targetHref}"]`).classList.add('card-description__content--active');
        }
    });
}

