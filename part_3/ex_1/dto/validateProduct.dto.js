import Joi from 'joi'
import validator from 'express-joi-validation'

validator.createValidator({})

export const validateProduct = (product) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().optional(),
        price: Joi.number().required(),
        categories: Joi.array().items(Joi.string()).optional()
    })
    return schema.validate(product)
}