import { Router } from "express"
import { StudentsService } from "./student.service.js"

export const StudentController = Router()

const studentService = StudentsService()

StudentController.get('/', async (req, res) => {
    let students = await studentService.getAll()
    res.render('students', {students})

})