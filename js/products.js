const container = document.querySelector('.products');
const BASE_URL = 'https://dummyjson.com/';
const product_url = 'https://dummyjson.com/products';

const updateElement = function(response) {
    let div = `
        <div class="product">
            <div class="product-img">
                <img src="${response.thumbnail}" alt="">
            </div>
            <div class="product-data">
                <div class="product-head">
                    <p class="product-brand">${response.brand}</p>
                    <span>|</span>
                    <p class="product-title">${response.title}</p>
                </div>
                <p class="product-body product-desc">${response.description}</p>
                <div class="product-foot">
                    <p class="product-price">${response.price}₼</p>
                    <p class="product-rating">${response.rating} ✬ </p>
                    <button class="add-to-basket" type="button">
                        <img src="../img/basket.png" alt="">
                    </button>
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', div);
}

// currying 
const api = method => async url => {
    const response = await fetch(url, {method});
    return await response.json()
}

api('GET')(`${BASE_URL}products`,)
.then(data => {
    const products = data.products
    products.forEach(element => updateElement(element));
})
.catch(error => console.log(error));