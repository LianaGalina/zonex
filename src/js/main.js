// import './vendor/focus-visible.min.js';
import vars from './_vars';
import './components/main-slider';
import './components/marketing';
import './components/catalog-slider';
import './components/catalog-filter-toggle';
import './components/catalog-props';
import './components/card-main-slider';
import './components/card-related-slider';
import './components/card-selects';
import './components/stepper';
import './components/card-tabs';
import './components/products';
import './components/burger';

import SimpleBar from 'simplebar';

import {resizeContent} from './functions/resize';
import {scrollTo} from './functions/smooth-scroll';
import {disableScroll, enableScroll} from './functions/stop-scroll';

if (vars.$cardDescription) {
    new SimpleBar(document.querySelector('.card-description__navigation'));
}


if (vars.$freeDeliveryBtn) {
    vars.$freeDeliveryBtn.addEventListener('click', () => {
        document.querySelector('.free-delivery').style.display = 'none';
    });
}

if (vars.$toTop) {
    vars.$toTop.addEventListener('click', (e) => {
        e.preventDefault();
        scrollTo(document.querySelector('.site-container'));
    });
}
