'use strict'

import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secretKey = process.env.SECRET_KEY 

export const generateJwt = async(payload)=>{
    try{
        return jwt.sign(payload, secretKey, {
            expiresIn: '30d',
            algorithm: 'HS256'
        })
    }catch(err){
        console.error(err)
        return err
    }
}