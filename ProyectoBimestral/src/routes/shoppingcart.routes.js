'use strict'

import express from 'express'
import { generateShoppingCart, generatePDFID} from '../controllers/shoppingcart.controller.js'
import {validateJwt, isClient, isAdmin} from '../middlewares/validate-jwt.js'

const api = express.Router()

api.post('/addCart',[validateJwt], generateShoppingCart)
api.get('/pdf/:id', [validateJwt, isAdmin], generatePDFID)

export default api