import express from 'express';
import ProductManager from './ProductManager/ProductManager.js';

const app = express();
const port = 8080;

const manager = new ProductManager("./ProductManager/products.json")

app.get('/products', async (req, res) => {
    const products = await manager.getProducts()
    if(req.query.limit)
        res.send(products.slice(0, req.query.limit))
    else
        res.send(products)
})

app.get('/products/:id', async (req, res) => {
    const product = await manager.getProductById(req.params.id)
    product ? res.send(product) : res.send("Producto no encontrado")
})




app.listen(port, () => console.log('Servidor corriendo en puerto 8080'));