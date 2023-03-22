import {Students} from '../../models/Students.js'

export const StudentsService = () => {

    const clean = (obj) => {
        for (var propName in obj) {
            if (obj[propName] === '') {
                delete obj[propName];
            }
        }
        return obj
    }

    const getAll = async (properties, sort) => {
        if(properties){
            properties = clean(properties)
            sort = {[properties?.sort] : parseInt(properties?.order)}
            delete properties?.sort;
            delete properties?.order;
        }
        
        try{
            const res = await Students.find({...properties}).sort({...sort});
            return res
        }catch(err){
            console.error('Failed to get students', err)
            throw 'Failed to get students';
        }
    }

    const create = async data => {
        const base = {
            validated: 'in progress',
            admin: false
        }

        const newStudent = new Students({ 
            ...data, ...base
        });

        try{
            const res = await newStudent.save()
            console.log(res)
        }catch(err){
            console.log('Failed to save student', err)
            throw 'Failed to save student';
        }
    }

    const update = async (id, data) => {
        try{
            const res = await Students.findByIdAndUpdate(id, data)
            console.log(res)
        }catch(err){
            console.log('Failed to update student', err)
            throw 'Failed to update student';
        }
    }

    const remove = async id => {
        try{
            const res = await Students.deleteOne({ _id: id})
            console.log(res)
        }catch(err){
            console.log('Failed to delete student', err)
            throw 'Failed to delete student';
        }
    }

    return {
        getAll,
        create,
        update,
        remove
    }
}