
//Importaciones
'use strict'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/routes/user.routes.js'
import categoryRoutes from '../src/routes/category.routes.js'
import productRoutes from '../src/routes/product.routes.js'
import shoppingCartRoutes from '../src/routes/shoppingcart.routes.js'
import billRoutes from '../src/routes/bill.routes.js'



const app = express() 
config()
const port = process.env.PORT || 3200


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors()) 
app.use(morgan('dev')) 


app.use(userRoutes)
app.use(categoryRoutes)
app.use(productRoutes)
app.use(shoppingCartRoutes)
app.use(billRoutes)


export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}