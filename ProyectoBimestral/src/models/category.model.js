import { Schema, model } from "mongoose";

const categorySchema = Schema({
    nameC: {
        type: String,
        unique: true,
        required: true
    }, 
    description: {
        type: String, 
        required: true
    }

})

export default model('category', categorySchema)