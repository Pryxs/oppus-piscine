import express from 'express'
import {config} from '../config.js'
import { dbConnect } from './database.js'
import { AuthController } from './modules/auth/auth.controller.js'
import { UserController } from './modules/user/user.controller.js'
import { ProductController } from './modules/product/product.controller.js'
import { CategoryController } from './modules/category/category.controller.js'


const app = express();

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

const start = async() => {
    await dbConnect()

    app.use('/register', UserController)
    app.use('/login', AuthController)
    app.use('/products', ProductController)
    app.use('/categories', CategoryController)


    app.use((req, res) => {
        res.status(404).json('Are you lost ?');
    })
    
    app.listen(config.app.port)
}

start()

