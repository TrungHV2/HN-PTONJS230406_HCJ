class Product {
    constructor(id, name, img, price, discount) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.price = price;
        this.discount = discount;
    }
}

var products = JSON.parse(localStorage.getItem('products')) || [];

function getData() {
    let id = $('#id').val();
    let name = $('#name').val();
    let img = $('#img').prop('files')[0].name;
    let price = parseInt($('#price').val());
    let discount = parseInt($('#discount').val());
    return new Product(id, name, img, price, discount);
}

function insertProduct(product = new Product()) {
    // validate
    if (products.find(x => x.id === product.id)) {
        alert('Mã sản phẩm đã tồn tại!');
        return;
    }
    if (products.find(x => x.name === product.name)) {
        alert('Tên sản phẩm đã tồn tại!');
        return;
    }
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

function renderProduct() {
    let rows = '';
    for (let p of products) {
        rows += `<tr>
                    <td>${p.id}</td>
                    <td>
                        <img src="img/${p.img}" width="75" alt="" />
                        ${p.name}
                    </td>
                    <td>${p.price}</td>
                    <td>${p.discount}</td>
                    <td>
                        <button class="btn btn-warning">Sửa</button>&nbsp;
                        <button class="btn btn-danger">Xóa</button>
                    </td>
                </tr>`
    }
    $('.list-product').html(rows);
}


renderProduct();
//Handle events
$('.btn-add').click(function() {
    let product = getData();
    insertProduct(product);
    renderProduct();
})