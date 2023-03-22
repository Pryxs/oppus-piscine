import { Router } from "express"
import { UserService } from "./user.service.js"
import { validatorMidlleware } from '../../midllewares/validator.js'
import { validateUser } from '../../dto/validateUser.dto.js'

export const UserController = Router()

const userService = UserService()

UserController.post('/', [validatorMidlleware(validateUser, "body")],async (req, res) => {
    try{
        let user = await userService.create(req.body)
        res.status(201).json(user)
    } catch(err){
        res.status(400).json(err)
    }
})




