'use strict'
import {Schema, model} from 'mongoose'

const billSchema = Schema({
    userBill: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }, 
    dateBill :{
        type: Date,
        default: Date.now,
        required: true
    }, 
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true
        }, 
        amount: { 
            type: Number, 
            required: true 
        },
        unit: { 
            type: Number, 
            required: true 
        },
        subTotal: { 
            type: Number,
            required: true 
        }
    }], 
    totalPurchase: {
        type: Number, 
        required: true 
    }
})

export default model('bill', billSchema)
