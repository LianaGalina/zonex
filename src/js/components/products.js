
const productsGrid = document.querySelector('.products-grid');
const loadMore = document.querySelector('.main-products__more');
let quantityProducts = 5;
let dataLength;

if (productsGrid) {
    const fetchProducts = (quantity = 5) => {
        fetch('../resources/products.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
    
            dataLength = data.length;
            productsGrid.innerHTML = '';
            for(i = 0; i < data.length; i++) {
                if (i < quantity) {
                    productsGrid.innerHTML += 
                        `
                            <li class="product-grid__item">
                                <article class="product">
                                    <div class="product__image">
                                        <img src="${data[i].img}" alt="${data[i].title}" class="product__image">
                                    </div>
                                    <a href="" class="product__link"></a>
                                    <h3 class="product__title">
                                        <a href="#">
                                            ${data[i].title}
                                        </a>
                                    </h3>
                                    <span class="product__price">${data[i].price}</span>
                                </article>
                            </li>
                        `
                }
            }
        });
    }
    
    fetchProducts(quantityProducts);
    
    loadMore.addEventListener('click', (e) => {
        quantityProducts = quantityProducts + 5;
    
        fetchProducts(quantityProducts);
    
        if (dataLength == quantityProducts) {
            loadMore.style.display = 'none';
        }
        else {
            loadMore.style.display = 'inline-flex ';
        }
    
    });
}

