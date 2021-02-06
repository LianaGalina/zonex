import vars from '../_vars';

if (vars.$colorSelect) {
    vars.$colorSelect.addEventListener('click', (e) => {
        if (e.target.classList.contains('color-select__btn')) {
            document.querySelectorAll('.color-select__btn').forEach(el => {el.classList.remove('color-select__btn--active')});
            
            let color = e.target.dataset.color;
            document.querySelector('.color-select__selected span').textContent = color;
    
            e.target.classList.add('color-select__btn--active');
        }
    });
}


if (vars.$sizeSelect) {

    let size = '';
    
    vars.$sizeSelect.addEventListener('click', (e) => {
        if (e.target.classList.contains('size-select__btn')) {
    
            document.querySelector('.size-select__clear').style.display = 'inline-block';
    
            e.target.classList.toggle('size-select__btn--active');
    
            if (e.target.classList.contains('size-select__btn--active')) {
                let currentSize = e.target.textContent;
                size += currentSize + ', ';
    
            } else {
                let currentSize = e.target.textContent + ', ';
                size = size.replace(currentSize, '');
            } 
    
            document.querySelector('.size-select__selected span').textContent = size;
            if(!size) { document.querySelector('.size-select__selected span').textContent = 'Select a size'; }
        }    
    });

    const clearBtn = document.querySelector('.size-select__clear');
    clearBtn.addEventListener('click', (e)=> {
    document.querySelector('.size-select__selected span').textContent = 'Select a size';
    document.querySelectorAll('.size-select__btn').forEach(el => {el.classList.remove('size-select__btn--active')});
    clearBtn = 'none';
})
}











