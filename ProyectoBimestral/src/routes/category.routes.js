import express from 'express';
import {createCategory, getCategories, getCategoryById, updateCategory, deleteCategory} from '../controllers/category.controller.js';

const api = express.Router();

// Ruta para crear una nueva categoría
api.post('/registerC', createCategory);

// Ruta para obtener todas las categorías
api.get('/getallC', getCategories);

// Ruta para obtener una categoría por su ID
api.get('/getidC/:id', getCategoryById);

// Ruta para actualizar una categoría por su ID
api.put('/updateC/:id', updateCategory);

// Ruta para eliminar una categoría por su ID
api.delete('/deleteC/:id', deleteCategory);

export default api;