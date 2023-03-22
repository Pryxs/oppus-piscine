import { Router } from "express"
import { StudentsService } from "./student.service.js"

export const StudentController = Router()

const studentService = StudentsService()

StudentController.post('/', async (req, res) => {
    await studentService.create(req.body)
})