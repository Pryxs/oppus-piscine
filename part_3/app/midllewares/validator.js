export const validatorMidlleware = (validator, type) => {
    return (req, res, next) => {
        console.log(req.body)
        const { error } = validator(req[type])
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        next();
    }
}