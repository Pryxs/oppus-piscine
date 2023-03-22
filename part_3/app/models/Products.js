import mongoose from 'mongoose'

const productSchemaObject = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    description : {
        type : String,
    },
    price : {
        type: Number,
        required: true,
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categories"
        }
    ]
})

export const Products = mongoose.model('products', productSchemaObject)