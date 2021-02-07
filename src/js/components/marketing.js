import vars from '../_vars';

if (vars.$marketing) {
    let counter = 0;
    let delay = 5000;

    const data = [
        {
            title: 'Теплый шерстяной пуловер',
            where: 'Москва, Россия',
            img: 'img/catalog8.jpg'
        },
        {
            title: 'Кожаные сапоги',
            where: 'Киев, Украина',
            img: 'img/bot.jpeg'
        },
        {
            title: 'Джоггеры Skinny Fit',
            where: 'Санкт-Петербург, Россия',
            img: 'img/joggers.jpg'
        },
    ];

    const closeMarketing = () => {
        vars.$marketing.classList.remove('marketing--visible');
    }

    const changeMarketingData = () => {
        vars.$marketing.classList.remove('marketing--visible');

        setTimeout(() => {
            vars.$marketing.classList.add('marketing--visible');
        }, delay - 3000);

        const stringTitle = `${data[counter].title}`;
        const stringWhere = `15 минут назад из ${data[counter].where}`;
        const stringImg = `${data[counter].img}`;

        vars.$marketing.querySelector('.marketing__title').textContent = stringTitle;
        vars.$marketing.querySelector('.marketing__where-from').textContent = stringWhere;
        vars.$marketing.querySelector('.marketing__image img').src = stringImg;

        counter++;

        if(counter === data.length) {
            counter = 0;
        }

    }

    // changeMarketingData();

    setInterval(changeMarketingData, delay);

    vars.$marketing.addEventListener('click', (e) => {
        if(e.target.classList.contains('marketing__close')){
            closeMarketing();
        }
    });


}


