import vars from "../_vars";

if (vars.$stepper) {
    const stepperInput = vars.$stepper.querySelector('.stepper__input');  
const stepperMinus = vars.$stepper.querySelector('.stepper__btn--minus'); 
const stepperPlus = vars.$stepper.querySelector('.stepper__btn--plus'); 

stepperInput.addEventListener('keydown', (e) => {
    console.log(e.currentTarget.value);

    if(e.currentTarget.value <= 1) {
        stepperMinus.classList.add('stepper__btn--disabled');
        stepperPlus.classList.remove('stepper__btn--disabled');
    } else {
        stepperMinus.classList.remove('stepper__btn--disabled');
    }

    if(e.currentTarget.value > 99998) {
        stepperPlus.classList.add('stepper__btn--disabled');
        stepperMinus.classList.remove('stepper__btn--disabled');
    } else {
        stepperPlus.classList.remove('stepper__btn--disabled');
    }
});

stepperPlus.addEventListener('click', (e) => {
    let currentValue = parseInt(stepperInput.value);
    currentValue++;
    stepperInput.value = currentValue;

    stepperMinus.classList.remove('stepper__btn--disabled');

    if(stepperInput.value > 99998) {
        stepperInput.value = 99999;
        stepperPlus.classList.add('stepper__btn--disabled');
        stepperMinus.classList.remove('stepper__btn--disabled');
    } else {
        stepperPlus.classList.remove('stepper__btn--disabled');
    }
});

stepperMinus.addEventListener('click', (e) => {
    let currentValue = parseInt(stepperInput.value);
    currentValue--;
    stepperInput.value = currentValue;

    if(stepperInput.value <= 1) {
        stepperInput.value = 1;
        stepperMinus.classList.add('stepper__btn--disabled');
        stepperPlus.classList.remove('stepper__btn--disabled');
    } else {
        stepperMinus.classList.remove('stepper__btn--disabled');
    }
});
}


