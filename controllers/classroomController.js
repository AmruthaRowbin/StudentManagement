const Classroom = require('../models/classroom')

const Joi = require('joi');

const classroomSchema = Joi.object({
    name: Joi.string().required(),
    capasity: Joi.number().integer().min(10).required(),
    studentId: Joi.string().required(),
    examId: Joi.string().required(),
   
  });
  

// Create a Classroom
exports.createClassroom = async (req, res) => {
    try {

        const { error } = classroomSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
    
        const { name, capacity, studentId, examId } = req.body;
        const newClassroom = new Classroom({ name, capacity,students:[studentId],exams: [examId]});
        await newClassroom.save();

        res.status(201).json({ message: 'Classroom created successfully', classroom: newClassroom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create classroom. Internal server error.' });
    }
};

// Update Classroom Details
exports.updateClassroom = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, capacity, studentId, examId  } = req.body;
        const updatedClassroom = await Classroom.findByIdAndUpdate(id, { name, capacity, students:[studentId],exams: [examId] }, { new: true });
        if (!updatedClassroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        res.status(200).json({ message: 'Classroom details updated successfully', classroom: updatedClassroom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update classroom details. Internal server error.' });
    }
};

// Delete a Classroom
exports.deleteClassroom = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedClassroom = await Classroom.findByIdAndDelete(id);
        if (!deletedClassroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        res.status(200).json({ message: 'Classroom deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete classroom. Internal server error.' });
    }
};

// List All Classrooms
exports.getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find();
        res.status(200).json({ message: 'Classrooms fetched successfully', classrooms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch classrooms. Internal server error.' });
    }
};

// Get Details of a Single Classroom
exports.getClassroomById = async (req, res) => {
    try {
        const { id } = req.params;
        const classroom = await Classroom.findById(id);

        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        res.status(200).json({ message: 'Classroom details fetched successfully', classroom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch classroom details. Internal server error.' });
    }
};
