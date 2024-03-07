import express from 'express';
import { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'

const api = express.Router();


api.post('/register', registerUser);
api.post('/login', loginUser);


api.get('/getall', getUsers);
api.get('/getid/:id',/* [validateJwt, isAdmin]*/getUserById);
api.put('/updateU/:id',/*[validateJwt, isAdmin],*/ updateUser);
api.delete('/deleteU/:id',/*[validateJwt, isAdmin],*/ deleteUser);

export default api;
