const express = require('express');
const mongoose = require('mongoose');
const config = require('../../config');
const {studentSchemaObject} = require('../studentSchema');
const {Student} = require('./students');


const app = express();

app.set('views', './part_2/views');
app.set('view engine', 'ejs');

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))


/*
    DB INIT
*/

const {host, port, name} = config.db

const dbConnect = async() => {
    try{
        await mongoose.connect(`mongodb://${host}:${port}/${name}`)
        console.log('Connection successfull')
    } catch(error){
        console.log('Connection failed')
    }
}

dbConnect();


/*
    MODELS
*/

const studentSchema = new mongoose.Schema(studentSchemaObject)
const StudentModel = mongoose.model('students', studentSchema)
const student = new Student(StudentModel)


/*
    ROTUES
*/


app.get('/', (req, res) => {
    student.getAll(req.query).then(students => {
        res.render('studentsList', {students})
    }).catch(err => {
        res.send(err)
    })
})

app.post('/', (req, res) => {
    student.create(req.body).then(students => {
        res.redirect('/');
    }).catch(err => {
        res.send(err)
    })
})

app.put('/students/:id', (req, res) => {
    student.update(req.params.id, req.body).then(response => {
        console.log(repsonse)
    }).catch(err => {
        res.send(err)
    })
})

app.delete('/students/:id', (req, res) => {
    student.delete(req.params.id).then(response => {
        console.log(repsonse)
    }).catch(err => {
        res.send(err)
    })
})



app.listen(config.app.port)



