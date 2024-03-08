import express from 'express';
import {searchBillID } from "../controllers/bill.controller.js";
import {validateJwt, isAdmin} from '../middlewares/validate-jwt.js'

const api = express.Router();

api.get('/findBill', [validateJwt, isAdmin], searchBillID);

export default api;