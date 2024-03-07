'use strict'
import {Schema, model} from 'mongoose'

const billSchema = Schema({
    dateB: {
        type: Date,
        default: Date.now,
        required: true
    },

    userB: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})