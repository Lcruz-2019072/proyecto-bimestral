
import express from 'express';
import {createProduct, watchItemsSelling, deleteProduct, getProduct, getProductsCategory, searchNameP, searchProduct, updateProduct} from '../controllers/product.controller.js';
import {validateJwt, isAdmin, isClient} from '../middlewares/validate-jwt.js';
const api = express.Router();

api.post('/addProduct',[validateJwt, isAdmin], createProduct);
api.put('/updateProduct/:id',[validateJwt, isAdmin], updateProduct);
api.get('/getProduct',[validateJwt], getProduct);
api.delete('/deleteProduct/:id',[validateJwt, isAdmin], deleteProduct);
api.get('/searchProduct', [validateJwt, isClient], searchNameP );
api.get('/getProductsCategory', [validateJwt, isClient], getProductsCategory);
api.get('/searchProduct/:search',[validateJwt], searchProduct);
api.get('/sellingProducts', [validateJwt], watchItemsSelling);



export default api;