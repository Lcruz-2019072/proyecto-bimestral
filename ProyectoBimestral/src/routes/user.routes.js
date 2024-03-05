import express from 'express';
import { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = express.Router();

// Ruta para registrar un nuevo usuario
api.post('/register', registerUser);

// Ruta para iniciar sesión de usuario
api.post('/login', loginUser);

// Ruta para obtener un usuario por su ID
api.get('/getid/:id', getUserById);

// Ruta para obtener todos los usuarios
api.get('/getall', [validateJwt], getUsers);

// Ruta para actualizar un usuario por su ID
api.put('/update/:id',[validateJwt], updateUser);

// Ruta para eliminar un usuario por su ID
api.delete('/delete/:id',[validateJwt], deleteUser);

export default api;
