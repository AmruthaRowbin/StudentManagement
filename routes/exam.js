const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// Create an exam
router.post('/exams', examController.createExam);

// Update an exam's details
router.put('/exams/:id', examController.updateExam);

// Delete an exam
router.delete('/exams/:id', examController.deleteExam);

// Get a list of all exams
router.get('/exams', examController.getAllExams);

// Get details of a single exam
router.get('/exams/:id', examController.getExamById);

module.exports = router;
