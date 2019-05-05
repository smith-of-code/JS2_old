const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

const getRequest = (url, cb) => {
    let xhr = new XMLHttpRequest();
    // window.ActiveXObject -> xhr = new ActiveXObject();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status !== 200){
                console.log('error');
            } else {
                cb(xhr.responseText);
            }
        }
    };
    xhr.send();
};


class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.products = [];
        this.productsAll = [];
        this._init();
    }
    _init(){
        this._fetchProducts();
        this._render();
    }
    _fetchProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.products = [...data];
                this._render();
            })
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.products = JSON.parse(data);
    //         this._render();
    //         cb();
    //     })
    // }
    calcSum(){
        // let result = 0;
        // for(let product of this.productsAll){
        //     result += product.price;
        // }
        // return result

        return this.productsAll.reduce((accum, item) => accum += item.price, 0);
    }
    _render(){
        const block = document.querySelector(this.container);
        for(let product of this.products){
            const prodObj = new ProductItem(product);
            this.productsAll.push(prodObj);
            block.insertAdjacentHTML('beforeend', prodObj.render());
        }
    }
}

class ProductItem {
    constructor(product, img='https://placehold.it/200x150'){
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                <img src="${this.img}" alt="${this.product_name}">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

const products = new ProductsList();
// console.log(products.calcSum());

// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 20},
//     {id: 3, title: 'Keyboard', price: 34},
//     {id: 4, title: 'Gamepad', price: 56},
//     {id: 5, title: 'Chair', price: 120},
// ];
//
// const renderProduct = (product, img = 'https://placehold.it/200x150') => {
//     return `<div class="product-item">
//                 <img src="${img}" alt="${product.title}">
//                 <div class="desc">
//                     <h3>${product.title}</h3>
//                     <p>${product.price}</p>
//                     <button class="buy-btn">Купить</button>
//                 </div>
//             </div>`
// };
//
// const renderPage = (list=products) => {
//     // document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
//
//     for(let el of list){
//         document.querySelector('.products').insertAdjacentHTML('beforeend', renderProduct(el));
//     }
// };
//
// renderPage();
