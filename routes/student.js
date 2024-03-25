

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');


router.post('/students',  studentController.createStudent);

router.put('/students/:id', studentController.updateStudent)

router.delete('/students/:id', studentController.deleteStudent);
router.get('/students', studentController.getAllStudents);
router.get('/students/:id', studentController.getStudentById);
module.exports = router;