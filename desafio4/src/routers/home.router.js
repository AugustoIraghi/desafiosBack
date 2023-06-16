import { Router } from 'express';
import ProductManager from '../services/ProductManager/ProductManager.js';

const router = Router();

const pm = new ProductManager("./src/services/ProductManager/products.json")

router.get('/', async (req, res) => {
    const products = await pm.getProducts()
    res.render('home', {products})
})

export default router;