import PDFDocument from 'pdfkit'
import fs from 'fs'
import Cart from '../models/shoppingcart.model.js'
import Product from '../models/product.model.js'    
import Bill from '../models/bill.model.js'
import {checkCart} from '../utils/validator.js'


export const generateShoppingCart = async (req, res) => {
    try {
        let { product, quantity, buy } = req.body

        let idUser = req.user._id
        console.log(idUser)

        if (!buy) {
            let data = await Product.findOne({_id: product})
            if(!data) return res.status(404).send({message: 'El producto no se encontro'})

            let check = await checkCart(data, quantity, data.stock)
            if (!check) return res.status(400).send({ message: 'Ya no tenemos suficiente stock de este producto' })

            let cart = await Cart.findOne({ user: idUser })
            if (!cart) {
                let newCart = new Cart({
                    user: idUser,
                    items: [{ product: product, quantity }],
                    total: data.priceProduct * quantity  
                });
                await newCart.save();
            
                return res.send({ message: `Este producto ya esta en el carrito , ${newCart.total}` });
            }
      
            let productExist = cart.items.findIndex(p => p.product.equals(product));
            
            if (productExist !== -1) {
                cart.items[productExist].quantity += parseInt(quantity);
            } else {
                cart.items.push({ product: product, quantity: quantity });
            }
            
            cart.total = 0;
            for (let item of cart.items) {
                let productData = await Product.findById(item.product);
                if (productData) {
                    cart.total += productData.priceProduct * item.quantity;
                }
            }
            
            await cart.save();
            return res.send({ message: `Producto agregado exitosamente al carrito. ${cart.total}` });
            
        } else if(buy.toUpperCase() === 'CONFIRM'){
            console.log(buy)
            let cart = await Cart.findOne({ user: idUser })
            if (!cart) return res.status(400).send({ message: 'El carrito no tiene productos.' })

            for (let item of cart.items) {
                let { product, quantity } = item
                let existingProduct = await Product.findById(product)
                if (!existingProduct) {
                    return res.status(404).send({ message: `El producto: ${product} no se encontro` })
                }
                if (quantity > existingProduct.stock) {
                    return res.status(400).send({ message: `Cantidad ${existingProduct.nameProduct} no hay esa cantidad en stock` })
                }
            }

            let billItem = []
            for (let item of cart.items) {
                let data = await Product.findById(item.product)
                if (data) {
                    billItem.push({
                        product: item.product,
                        quantity: item.quantity,
                        price: data.priceProduct, 
                    })
                }
            }

            let bill = new Bill({
                user: cart.user,
                items: billItem,
                totalAmount: cart.total
            })

            for (let item of cart.items) {
                let data = await Product.findById(item.product)
                if (data) {
                    data.stock -= item.quantity
                    await data.save()
                }
            }

            let saveBill = await bill.save()
            await Cart.deleteOne({ _id: cart._id })
            await generatePDF(saveBill._id)
            return res.send({ message: 'La compra se completo', bill: saveBill })
        }else{
            return res.status(400).send({ message: 'Escribe BUY para terminar tu compra' })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error al registrar ', error: error })
    }
}

export const generatePDF = async (id) => {
    try {

        let bill = await Bill.findOne({_id: id}).populate('user').populate('items.product')
        let doc = new PDFDocument()
        let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
        let formattedDate = bill.date.toLocaleDateString('es-ES', dateOptions)
        doc.fontSize(40).text('Bill Kinal Sales', { align: 'center' }).moveDown()

        doc.fontSize(21).text(`Numero de factura: ${bill._id}`, { align: 'left' }).moveDown()
        doc.fontSize(21).text(`Nombre y Apellido: ${bill.user.name} ${bill.user.surname}`, { align: 'left' }).moveDown()
        doc.fontSize(21).text(`Usuario: ${bill.user.username}`, { align: 'left' }).moveDown()
        doc.fontSize(21).text(`Fecha: ${formattedDate}`, { align: 'left' }).moveDown()

        doc.fontSize(16).text('Items:', { align: 'left' }).moveDown()
        for (let item of bill.items) {
            doc.fontSize(14).text(`Producto: ${item.product.nameProduct},
                                    Cantidad: ${item.quantity}, 
                                    Precio: ${item.price}`, 
                                    { align: 'left' }).moveDown()
        }
        doc.fontSize(14).text(`Total: ${bill.totalAmount}`, { align: 'left' }).moveDown()
 
        let pdfPath = `${bill.user.username}.pdf`
        doc.pipe(fs.createWriteStream(pdfPath))
        doc.end()

        return pdfPath
    } catch (error) {
        console.error('Error al genearar el PDF:', error)
    }
}

export const generatePDFID = async (req, res) => {
    try {
        let {id} = req.params
        let bill = await Bill.findOne({_id: id}).populate('user').populate('items.product')
        if(!bill) return res.status(404).send({message: 'la factura no fue encontrada'})
        const doc = new PDFDocument()
        let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
        let formattedDate = bill.date.toLocaleDateString('es-ES', dateOptions)
        
        doc.fontSize(20).text('Factura', { align: 'center' }).moveDown()

        doc.fontSize(14).text(`No.factura: ${bill._id}`, { align: 'left' }).moveDown()
        doc.fontSize(14).text(`Nombre: ${bill.user.name} `, { align: 'left' }).moveDown()
        doc.fontSize(14).text(`Apellido: ${bill.user.surname}`, {align: 'left'}).moveDown()
        doc.fontSize(14).text(`Usuario: ${bill.user.username}`, { align: 'left' }).moveDown()
        doc.fontSize(14).text(`Fecha: ${formattedDate}`, { align: 'left' }).moveDown()

        doc.fontSize(16).text('Sus productos:', { align: 'left' }).moveDown()
        for (const item of bill.items) {
            doc.fontSize(14).text(`Productos: ${item.product.nameProduct}, 
                                    Cantidad: ${item.quantity}, 
                                    Precio: ${item.price}`, 
                                    { align: 'left' }).moveDown()
        }
        doc.fontSize(14).text(`Total Amount: ${bill.totalAmount}`, { align: 'left' }).moveDown()
 
        const pdfPath = `BillSale_${bill._id}_${bill.user.username}.pdf`
        doc.pipe(fs.createWriteStream(pdfPath))
        doc.end()

        return res.send({message: pdfPath})
    } catch (error) {
        console.error('Error, no se genero la factura:', error)
        return res.status(500).send({message: 'Error al gener el pdf'})
    }
}