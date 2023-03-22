import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import {config} from '../config.js'
import { dbConnect } from './database.js';
import { StudentController } from './modules/students/student.controller.js';

const dirname =  path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set('views', dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

const start = async() => {
    await dbConnect()
    
    app.use('/', StudentController)
    app.use('/students/:id', StudentController)
    
    app.listen(config.app.port)
}

start()

