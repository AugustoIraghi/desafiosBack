import express from 'express';
import home from './routers/home.router.js';
import realTimeProducts from './routers/realTimeProducts.router.js';
import { Server } from 'socket.io';
import ProductManager from './services/ProductManager/ProductManager.js';
import handlebars from 'express-handlebars';


const app = express();
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

const pm = new ProductManager("./src/services/ProductManager/products.json")

app.use(express.static("./public"));

app.use('/home', home);
app.use('/realtimeproducts', realTimeProducts);


const serverHttp = app.listen(8080, () => console.log('Server listening on port 8080'));

const io = new Server(serverHttp);

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('newProduct', async (data) => {
        const {title, description, code, price, status, stock, category, thumbnails} = data;
        pm.addProduct(title, description, code, price, status, stock, category, thumbnails);
        const products = await pm.getProducts();
        io.emit("allProducts", products);
    });
    
    socket.on('disconnect', () => console.log('Client disconnected'));
});

