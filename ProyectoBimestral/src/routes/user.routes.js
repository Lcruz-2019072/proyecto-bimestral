import express from 'express';
import { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';

const api = express.Router();

// Ruta para registrar un nuevo usuario
api.post('/register', registerUser);

// Ruta para iniciar sesión de usuario
api.post('/login', loginUser);

// Ruta para obtener todos los usuarios
api.get('/getall', getUsers);

// Ruta para obtener un usuario por su ID
api.get('/getid/:id', getUserById);

// Ruta para actualizar un usuario por su ID
api.put('/update/:id', updateUser);

// Ruta para eliminar un usuario por su ID
api.delete('/delete/:id', deleteUser);

export default api;
