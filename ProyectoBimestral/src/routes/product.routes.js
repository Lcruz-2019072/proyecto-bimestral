
import express from 'express';
import {createProduct, watchItemsSelling, deleteProduct, getProduct, getProductsCategory, searchNameP, updateProduct} from '../controllers/product.controller.js';
import {validateJwt, isAdmin, isClient} from '../middlewares/validate-jwt.js';
const api = express.Router();

api.post('/addProduct',[validateJwt, isAdmin], createProduct);
api.put('/updateP/:id',[validateJwt, isAdmin], updateProduct);
api.get('/getProduct',[validateJwt], getProduct);
api.delete('/deleteP/:id',[validateJwt, isAdmin], deleteProduct);
api.get('/searchProduct', [validateJwt,], searchNameP );
api.get('/getProductsCategory', [validateJwt, isClient], getProductsCategory);
api.get('/sellingProducts', [validateJwt, isAdmin], watchItemsSelling);

export default api;