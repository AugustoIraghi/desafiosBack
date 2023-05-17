import fs from 'fs';


class ProductManager{
    constructor(path){
        this.#path = path
        this.#format = "utf-8"
    }

    addProduct = async(title, description, price,thumbnail, code, stock) => {
        const products = await this.getProducts()
        products.push({id: products.lenght+1, title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock})
        this.updateJSON()
    }

    getProducts = async() =>{
        return JSON.parse(await fs.promises.readFile(this.#path, this.#format))
    }

    getProductById = async(id) => {
        const products = await this.getProducts()
        console.log(products[this.findProduct(id)])
    }


    updateProduct = async(id, campo, dato) => {
        const products = await this.getProducts()
        const product = products[this.findProduct(id)]
        if (product[campo]){
            product[campo] = dato
            this.updateJSON()
        }
        else return console.log("Error: Campo no encontrado")
    }


    deleteProduct = async(id) => {
        const products = this.getProducts()
        products.splice(this.findProduct(id),1)
        this.updateJSON()
    }

    findProduct = async(id) => {
        const products = await this.getProducts()
        return products.find(product => product.id === id)
    }

    updateJSON = async() => {
        return await fs.promises.writeFile(this.#path, JSON.stringify(products, null, "\t"))
    }

}

const manager = new ProductManager("./products.json")