'use strict'

import Category from '../models/category.model.js'
import Product from '../models/product.model.js'
import { checkUpdate } from '../utils/validator.js'


export const restockProduct = async(req, res) =>{
    try {
        let product = await Product.find({stock: 0})
        if(product.length === 0) return res.status(400).send({message: 'No products with stock = 0 found'})
        return res.send({message: 'Products with stock 0 found', product})

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error searching for sold out products ', error: error })
    }
}

export const createProduct = async (req, res)=>{
    try {

        let data = req.body
        console.log(data)
        let product = new Product(data)
        await product.save()
        return res.send({message: `Registered successfully,${product.nameP} was registered`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error registering product', error: error})
    }
}

export const updateProduct = async(req, res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let update =  checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Revisa tu data , no se pudo actualizar'})
        let updateProduct = await Product.findOneAndUpdate(
            { _id: id },
            data,
            {new: true} 
        ).populate('category', ['nameC'])
        if (!updateProduct) return res.status(401).send({ message: 'Producto no fue actualizado' })
        return res.send({ message: 'Product  update', updateProduct })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error al actualizar' })
    }
}

export const deleteProduct = async(req, res)=>{
    try {
        let {id} = req.params
        let deletedProduct =  await Product.findOneAndDelete({_id: id})
        if(!deletedProduct) return res.status(404).send({message: 'Product not found and not deleted'})
        return res.send({message: `Product ${deletedProduct.nameP} deleted successfully`})
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting Product', error: error })
        
    }

}

export const getProduct = async (req, res)=>{
    try {
        
        let product = await Product.find()
        if(!product) return res.status(404).send({message: 'Product not found'})
        return res.send({product})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error listing product', error: error })
    }
}


export const searchProduct = async (req, res)=>{
    try {
        let {search} = req.params
        let product = await Product.find({_id: search}).populate('Category', ['nameC'])
        return res.send({ product })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error seraching product', error: error })
    }

}
