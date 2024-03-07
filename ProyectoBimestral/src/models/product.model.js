'use strict'
import { Schema, model } from "mongoose"; 

const productSchema = Schema({
    nameP: {
        type: String, 
        required: true
    }, 
    descriptionP: {
        type: String, 
        required: true
    },
    priceP: {
        type: Number, 
        required: true
    }, 
    trademark: {
        type: String, 
        required: true
    }, 
    stock: {
        type: Number, 
        required: true
    }, 
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category', 
        required: true

    }
})


export default model('product', productSchema)
