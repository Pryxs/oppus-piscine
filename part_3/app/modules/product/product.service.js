import {Products} from '../../models/Products.js'
import {cleaner} from '../../helpers/cleaner.helper.js'

export const ProductService = () => {
    const get = async properties => {   
        try{
            const product = await Products.findOne({...properties})
            return product;
        } catch(err){
            throw 'Failed to find product'
        }
    }

    const getAll = async data => {   
        try{
            data = cleaner.cleanObj(data)
            const products = await Products.find(data).select('-__v').populate("categories", "-__v")
            return products;
        } catch(err){
            throw 'Failed to find products'
        }
    }

    const create = async data => {
        try{
            const newProduct = new Products({
                ...data
            })
            
            let product = await newProduct.save()
            return product;
        }catch(err){
            throw 'Failed to create product';
        }
    }

    const update = async (id, data) => {
        try{
            const product = await Products.findByIdAndUpdate(id, data)
            return product
        }catch(err){
            throw 'Failed to update product';
        }
    }

    return {
        get,
        getAll,
        create,
        update
    }
}