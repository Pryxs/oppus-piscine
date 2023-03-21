const express = require('express');
const mongoose = require('mongoose');
const config = require('../../part_1/config');

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
        minlength: 10,
        maxlength: 10,
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

const getStudents = async () => {
    const res = await Student.find({'validated':'in progress'}).sort({lastName: 1});
    return res;
}

dbConnect();


app.get('/', (req, res) => {
    getStudents().then(students => {
        res.render('students', {students})
    })
})

getStudents()


app.listen(config.app.port)



