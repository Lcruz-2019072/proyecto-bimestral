import Product from '../models/product.model.js'
import Category from '../models/category.model.js'
import Bill from '../models/bill.model.js'




export const createProduct = async (req, res)=>{
    try {
        let data = req.body
        console.log(data)
        if(!data.category){
            let categoryDefault = await Category.findOne({nameCategory: 'Default'})
            data.category = categoryDefault._id
        }
        let existProduct = await Product.findOne({nameProduct: data.nameProduct})
        if(existProduct) return res.status(401).send({message: 'This product is alredy exist'})
        let product = new Product(data)
        await product.save()
        return res.send({message: `Registered successfully,${product.nameProduct} was registered`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error registering product', error: error})
    }
}

export const updateProduct = async(req, res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let updateProduct = await Product.findOneAndUpdate(
            { _id: id },
            data,
            {new: true} 
        ).populate('category', ['nameCategory'])
        if (!updateProduct) return res.status(401).send({ message: 'Product not found' })
        return res.send({ message: 'Product  update', updateProduct })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating' })
    }
}

export const getProduct = async (req, res)=>{
    try {
        
        let product = await Product.find().populate('category', ['nameCategory'])
        if(!product) return res.status(404).send({message: 'Product not found'})
        return res.send({product})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error listing product', error: error })
    }
}



export const deleteProduct = async(req, res)=>{
    try {
        let {id} = req.params
        let deletedProduct =  await Product.findOneAndDelete({_id: id})
        if(!deletedProduct) return res.status(404).send({message: 'Product not found and not deleted'})
        return res.send({message: `Product ${deletedProduct.nameProduct} deleted successfully`})
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting Product', error: error })
        
    }

}
export const searchNameP = async (req, res)=>{
    try {
        let {name} = req.body
        let product = await Product.findOne({nameProduct: {$regex: name}}).populate('category', ['nameCategory'])
        return res.send({ product })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error seraching product', error: error })
    }

}

export const watchItemsSelling = async (req, res) => {
    try {
        let productsMostSold = await Product.find({}).sort({stock: 1});

        return res.send(productsMostSold)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'No found selling products', error: error })
    }
}

export const getProductsCategory = async (req, res) =>{
    try {
        let {category} = req.body
        let categoryExist = await Category.findOne({nameCategory: category})
        if(!categoryExist) return res.status(404).send({message: 'Category not exist'})
        let findProduct = await Product.find({category: categoryExist._id})
        if(!findProduct) return res.status(404).send({message: 'fail found products'})
        return res.send(findProduct)
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'fail get products'})

    }
}