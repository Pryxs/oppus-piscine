import mongoose from 'mongoose'

const userSchemaObject = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type : String,
        validate : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        required: true
    },
    password : {
        type: String,
        minlength: 5,
        required: true
    },
    admin : {
        type : Boolean,
        required: true
    }
})

export const Users = mongoose.model('users', userSchemaObject)