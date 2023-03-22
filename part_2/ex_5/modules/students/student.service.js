import {Students} from '../../models/Students.js'

export const StudentsService = () => {
    const create = async data => {
        try{
            const base = {
                validated: 'in progress',
                admin: false
            }
            const newStudent = new Students({ 
                ...data, ...base
            })

            await newStudent.save()
            console.log('Document saved')
        }catch(err){
            console.error(err)
            console.log('Failed to save the document')
        }
    }

    return {
        create,
    }
}