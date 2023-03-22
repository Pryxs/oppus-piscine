import { Router } from "express"
import { CategoryService } from './category.service.js'
import { validatorMidlleware } from '../../midllewares/validator.js'
import { validateCategory } from '../../dto/validateCategory.dto.js'
import { authentificationMidlleware } from "../../midllewares/authentification.js"

export const CategoryController = Router()

const categoryService = CategoryService()

CategoryController.get('/:id?', async (req, res) => {
    try{
        const categories = req.params.id 
            ? await categoryService.get() 
            : await categoryService.getAll()

        res.status(200).json(categories)
    } catch(err){
        res.status(400).json(err)
    }
})

CategoryController.post('/', [validatorMidlleware(validateCategory, "body"), authentificationMidlleware()],async (req, res) => {
    try{
        const category = await categoryService.create(req.body)
        res.status(201).json(category)
    } catch(err){
        res.status(400).json(err)
    }
})


