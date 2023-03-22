import Joi from 'joi'
import validator from 'express-joi-validation'

validator.createValidator({})

export const validateAuth = (auth) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().required(),
        password: Joi.string().min(5).required()
    })
    return schema.validate(auth)
}