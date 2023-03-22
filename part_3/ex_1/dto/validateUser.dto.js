import Joi from 'joi'
import validator from 'express-joi-validation'

validator.createValidator({})

export const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    })
    return schema.validate(user)
}