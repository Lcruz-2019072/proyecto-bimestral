import { Schema, model } from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'CLIENT'],
        required: true
    }
    },{
        versionKey: false
    })

export default model('User', userSchema)
