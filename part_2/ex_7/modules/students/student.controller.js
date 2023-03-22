import { Router } from "express"
import { StudentsService } from "./student.service.js"

export const StudentController = Router()

const studentService = StudentsService()

StudentController.get('/', async (req, res) => {
    try{
        let students = await studentService.getAll(req.query)
        res.render('students', {students})
    } catch(err){
        res.send(err)
    }
})


StudentController.post('/', async (req, res) => {
    await studentService.create(req.body)
    res.redirect('/');
})

StudentController.put('/students/:id', async (req, res) => {
    await studentService.update(req.params.id, req.body)
    res.redirect('/');
})


StudentController.delete('/students/:id', async (req, res) => {
    await studentService.remove(req.params.id)
    res.redirect('/');
})

