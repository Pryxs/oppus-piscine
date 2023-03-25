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
            const categories = await Categories.find().select('-__v')
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

    const update = async (id, data) => {
        try{
            const category = await Categories.findByIdAndUpdate(id, data)
            return category
        }catch(err){
            throw 'Failed to update category';
        }
    }

    const remove = async id => {
        try{
            await Categories.deleteOne({ _id : id })
        }catch(err){
            throw 'Failed to delete category';
        }
    }

    return {
        get,
        getAll,
        create,
        update,
        remove
    }
}