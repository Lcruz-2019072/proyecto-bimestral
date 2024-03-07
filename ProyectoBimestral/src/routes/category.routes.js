import express from 'express';
import {createCategory, getCategories, updateCategory, deleteCategory} from '../controllers/category.controller.js';
import { validateJwt, isAdmin, isClient } from '../middlewares/validate-jwt.js';

const api = express.Router();

api.get('/getallC', [isAdmin, isClient],getCategories);


api.post('/registerC', [validateJwt, isAdmin] ,createCategory);
api.put('/updateC/:id', [validateJwt, isAdmin] ,updateCategory);
api.delete('/deleteC/:id', [validateJwt, isAdmin] ,deleteCategory);

export default api;