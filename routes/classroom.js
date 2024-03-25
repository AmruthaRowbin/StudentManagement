const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');

// Create a Classroom
router.post('/classrooms', classroomController.createClassroom);

// Update Classroom Details
router.put('/classrooms/:id', classroomController.updateClassroom);

// Delete a Classroom
router.delete('/classrooms/:id', classroomController.deleteClassroom);

// List All Classrooms
router.get('/classrooms', classroomController.getAllClassrooms);

// Get Details of a Single Classroom
router.get('/classrooms/:id', classroomController.getClassroomById);

module.exports = router;
