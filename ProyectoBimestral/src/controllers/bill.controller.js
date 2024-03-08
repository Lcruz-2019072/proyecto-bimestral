'use strict'

import Bill from '../models/bill.model.js'
import User from '../models/user.model.js'


export const searchBill = async(id) =>{
    try {
        let user = id
        let billFound = await Bill.find({user}).populate('user',  ['username']).populate('items.product',  ['nameProduct'])
        if(!billFound) return console.log('not found Bills')
        return billFound


    } catch (error) {
        console.error(error)
    }
}

export const searchBillID = async(req, res) =>{
    try {
        let {username} = req.body
        let userS = await User.findOne({username: username})
        if(!userS) return res.status(404).send({message: 'NOT FOUND User'})
        let user = userS._id
        let billFound = await Bill.find({user}).populate('user',  ['username']).populate('items.product',  ['nameProduct'])
        if(!billFound) return res.status(404).send({message: 'NOT FOUND BILL'})

        return res.send({billFound})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'BILL NOT FOUND'})
    }
}
