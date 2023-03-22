import { Router } from "express"
import { AuthService } from "./auth.service.js"
import { validatorMidlleware } from '../../midllewares/validator.js'
import { validateAuth } from '../../dto/validateAuth.dto.js'

export const AuthController = Router()

const authService = AuthService()

AuthController.post('/', [validatorMidlleware(validateAuth, "body")], async (req, res) => {
    try{
       const user = await authService.login(req.body)
        res.status(201).json(user)
    } catch(err){
        res.status(401).json(err)
    }
})



