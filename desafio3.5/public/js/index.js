const socket = io();

const productsList = document.getElementById('productsList');


//se que no es la mejor forma de hacerlo, pero me estaba quemando mucho la cabeza llamar al form de un saque
const submitBtn = document.getElementById('submitBtn');
const title = document.getElementById('title');
const description = document.getElementById('description');
const code = document.getElementById('code');
const price = document.getElementById('price');
const status = document.getElementById('status');
const stock = document.getElementById('stock');
const category = document.getElementById('category');
const thumbnails = document.getElementById('thumbnails');



submitBtn.addEventListener('click', e => {
    if (title.value == '' || description.value == '' || code.value == '' || price.value == '' || status.value == '' || stock.value == '' || category.value == '' || thumbnails.value == '') {
        alert('Todos los campos son obligatorios');
        return;
    }
    const product = {title: title.value, description: description.value, code: code.value, price: price.value, status: status.value, stock: stock.value, category: category.value, thumbnails: thumbnails.value}
    socket.emit('newProduct', product);
    title.value = '';
    description.value = '';
    code.value = '';
    price.value = '';
    status.value = '';
    stock.value = '';
    category.value = '';
    thumbnails.value = '';
});

socket.on('allProducts', (data) => {
    let products = `<tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Código</th>
                    <th>Precio</th>
                    <th>Status</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                    <th>URL de la imagen</th>
                </tr>
                `;
    data.forEach((product) => {
        products += `
        <tr class="prodLi">
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.code}</td>
            <td>${product.price}</td>
            <td>${product.status}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            <td>${product.thumbnails}</td>
        </tr>`;
    });
    console.log(products);
    productsList.innerHTML = products;
});