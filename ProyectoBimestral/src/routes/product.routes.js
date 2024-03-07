'use strict'

import { Router } from "express"
import {createProduct, deleteProduct, getProduct, searchProduct, restockProduct, updateProduct} from '../controllers/product.controller.js'
import {validateJwt, isAdmin, isClient} from '../middlewares/validate-jwt.js'
const api = Router()


api.post('/createP',/*[validateJwt, isAdmin],*/ createProduct)
api.put('/updateP/:id',/*[validateJwt, isAdmin],*/ updateProduct)
api.delete('/deleteP/:id',/*[validateJwt, isAdmin],*/ deleteProduct)
api.get('/restockP',/*[validateJwt, isAdmin],*/ restockProduct)
api.get('/getP', getProduct)
api.get('/searchP/:search', searchProduct)


export default api