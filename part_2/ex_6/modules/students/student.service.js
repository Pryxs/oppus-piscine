import {Students} from '../../models/Students.js'

export const StudentsService = () => {
    const getAll = async data => {
        try{
            const res = await Students.find({'validated':'in progress'}).sort({lastName: 1});
            return res;
        }catch(err){
            console.error(err)
            console.log('Failed to save the document')
        }
    }

    return {
        getAll,
    }
}