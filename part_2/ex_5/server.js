const express = require('express');
const mongoose = require('mongoose');
const config = require('../../config');
//const studentSchemaData = require('../student.json')


const app = express();

app.set('views', './part_2/views');
app.set('view engine', 'ejs');

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

const {host, port, name} = config.db


// SCHEMA / MODEL

const studentSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : {
        type : String,
        validate : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    phone : {
        type: String,
    },
    validated: {
        type: String,
        enum: {
            values: [
                "in progress",
                "validated",
                "rejected"
            ]
        }
    },
    admin : Boolean

})

const Student = mongoose.model('students', studentSchema)


const dbConnect = async() => {
    try{
        await mongoose.connect(`mongodb://${host}:${port}/${name}`)
        console.log('Connection successfull')
    } catch(error){
        console.log('Connection failed')
    }
}

const createStudent = async data => {
    const base = {
        validated: 'in progress',
        admin: false
    }
    const newStudent = new Student({ 
        ...data, ...base
    });
    try{
        await newStudent.save()
        console.log('Document saved')
    }catch(err){
        console.error(err)
        console.log('Failed to save the document')
    }
}

dbConnect();


app.get('/', (req, res) => {
    res.render('form');
})

app.post('/', (req, res) => {
    createStudent(req.body)
})

app.listen(config.app.port)



