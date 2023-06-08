var products = JSON.parse(localStorage.getItem('products')) || [];
// Giỏ hàng
var carts = JSON.parse(sessionStorage.getItem('carts')) || [];


function renderProduct() {
    let rows = '';
    for (let p of products) {
        rows += `<div class="col-md-4">
                    <div class="product-item">
                        <div class="product-img">
                            <img class="img-fluid"  src="img/${p.img}" alt="">
                            <div class="product-action text-center">
                                <button type="button" class="btn btn-outline-dark">
                                    <i class="bi bi-heart"></i>
                                </button>
                                <button type="button" class="btn btn-danger" onclick="addToCart('${p.id}')">
                                    Add to cart
                                </button>
                                <button type="button" class="btn btn-outline-dark">
                                    <i class="bi bi-eye"></i>
                                </button>
                            </div>
                        </div>
                        <h3><a href="">${p.name}</a></h3>
                        <div class="product-price">
                            <span class="sale-price">${(p.price - (p.price * p.discount / 100)).toFixed()}</span>
                            <span class="price">${p.price.toFixed()}</span>
                        </div>
                    </div>
                </div>`
    }
    $('.product-render').html(rows);
}

renderProduct();



function addToCart(productId) {
    // tìm sp cần thêm
    let pro = products.find(x => x.id === productId);
    // Kiểm tra sp đã được mua chưa
    let cartItem = carts.find(x => x.product.id === productId);

    if (cartItem) { // nếu đã mua
        cartItem.quantity += 1;
    } else { // Thêm mới
        carts.push({
            product: pro,
            price: (pro.price - (pro.price * pro.discount / 100)),
            quantity: 1
        })
    }
    // Lưu và storage
    sessionStorage.setItem('carts', JSON.stringify(carts));
    // Chuyển sang trang giỏ hàng
    window.location.href = 'shopping-cart.html';
}