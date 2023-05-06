class ProductManager {
    #products
    constructor() {
        this.#products = [];
    }

    getProducts = () => console.log(this.#products)

    addEvent = (title, description, price, thumbnail, code, stock) => {
        if(!title || !description || !price || !thumbnail || !code || !stock) return console.log('Error: Faltan datos')
        else if(this.#products.find(product => product.code === code)) return console.log('Error: Código de producto repetido')
        else {
            this.#products.push({ title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock, id: this.#products.length + 1 })
            console.log('Producto agregado')
        }
    }

    getProductById = (id) => this.#products.find(product => product.id === id) ? console.log(this.#products.find(product => product.id === id)) : console.log('Error: Producto no encontrado')
}

const productManager = new ProductManager();

productManager.addEvent("producto prueba", "Este es un producto de prueba", 200, "sin imagen", "abc123", 25)

productManager.addEvent("producto prueba", "Este es un producto de prueba", 200, "sin imagen", "abc123", 25)

productManager.getProductById(1)

productManager.getProductById(4)