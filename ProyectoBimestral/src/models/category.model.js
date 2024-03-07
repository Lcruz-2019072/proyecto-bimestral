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
    },
    
},{
    versionKey: false
})

export default model('category', categorySchema)