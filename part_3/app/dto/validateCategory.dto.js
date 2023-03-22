import Joi from 'joi'
import validator from 'express-joi-validation'

validator.createValidator({})

export const validateCategory = (category) => {
    const schema = Joi.object({
        name: Joi.string().required(),
    })
    return schema.validate(category)
}