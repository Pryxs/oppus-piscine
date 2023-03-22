import mongoose from 'mongoose'

const categorySchemaObject = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: true,
    }
})

export const Categories = mongoose.model('categories', categorySchemaObject)