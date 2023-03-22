import {Categories} from '../../models/Categories.js'

export const CategoryService = () => {

    const get = async properties => {   
        try{
            const category = await Categories.findOne({...properties})
            return category;
        } catch(err){
            throw 'Failed to find category'
        }
    }

    const getAll = async () => {   
        try{
            const categories = await Categories.find()
            return categories;
        } catch(err){
            throw 'Failed to find categories'
        }
    }

    const create = async data => {
        try{
            const newCategory = new Categories({
                ...data
            })
            
            let category = await newCategory.save()
            return category;
        }catch(err){
            throw 'Failed to create category : ' + err;
        }
    }

    return {
        get,
        getAll,
        create
    }
}