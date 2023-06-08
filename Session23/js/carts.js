// Giỏ hàng
var carts = JSON.parse(sessionStorage.getItem('carts')) || [];

function renderProduct() {
    let rows = '';
    for (let c of carts) {
        rows += `<tr>
                    <td>
                        <img src="img/${c.product.img}" width="75" alt="" />
                        ${c.product.name}
                    </td>
                    <td>${c.price}</td>
                    <td>
                        <input min="1" type="number" onchange="updateCart('${c.product.id}', event)" value="${c.quantity}" />
                    </td>
                    <td>${c.price * c.quantity}</td>
                    <td>
                        <button class="btn btn-danger">Xóa</button>
                    </td>
                </tr>`
    }
    $('.product-carts').html(rows);
}

function updateCart(productId, event) {
    // tìm đối tượng cần update
    let cartItem = carts.find(x => x.product.id === productId);
    cartItem.quantity = parseInt(event.target.value);

    // lưu lại vào storage
    sessionStorage.setItem('carts', JSON.stringify(carts));
    renderProduct();
} 
renderProduct();