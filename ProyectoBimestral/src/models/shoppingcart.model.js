import { Schema, model } from "mongoose";

const shoppingCartSchema = Schema({
  client: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  product: {
    type: Schema.ObjectId,
    ref: 'product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})

export default model('shoppingcart', shoppingCartSchema)