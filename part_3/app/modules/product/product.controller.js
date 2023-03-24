import { Router } from "express"
import { ProductService } from "./product.service.js"
import { validatorMidlleware } from '../../midllewares/validator.js'
import { validateProduct } from '../../dto/validateProduct.dto.js'
import { authentificationMidlleware } from "../../midllewares/authentification.js"

export const ProductController = Router()

const productService = ProductService()

ProductController.get('/:id?', async (req, res) => {
    try{
        const products = req.params.id 
            ? await productService.get({'_id' : req.params.id}) 
            : await productService.getAll(req.query)

        res.status(200).json(products)
    } catch(err){
        res.status(400).json(err)
    }
})

ProductController.post('/', [validatorMidlleware(validateProduct, "body"), authentificationMidlleware()],async (req, res) => {
    try{
        const product = await productService.create(req.body)
        res.status(201).json(product)
    } catch(err){
        res.status(400).json(err)
    }
})

ProductController.put('/:id', [validatorMidlleware(validateProduct, "body"), authentificationMidlleware()],async (req, res) => {
    try{
        const product = await productService.update(req.params.id, req.body)
        res.status(200).json(product)
    } catch(err){
        res.status(400).json(err)
    }
})




