const Student = require('../models/student')
const mongoose = require('mongoose');

const Joi = require('joi');

// Define Joi schema for student creation
const studentSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(1).required(),
  email: Joi.string().email().required(),
  examId: Joi.string().required() ,
  address: Joi.string().required(),
  phone_no: Joi.string().required(),
  guardian_name: Joi.string().required(),
  roll_no:Joi.string().required()
});

//create student

exports.createStudent = async (req, res) => {
    try {
      const { error } = studentSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { name, age, email, examId ,address,phone_no,roll_no,guardian_name} = req.body;
      const student = new Student({ name, age, email, exam: examId ,address,phone_no,roll_no,guardian_name});
      await student.save();
      res.status(201).json({ message: 'Student added successfully', student });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
//update student

exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStudent = await Student.findByIdAndUpdate(
            id,  
            req.body,
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ message: 'Student updated successfully', student: updatedStudent });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAllStudents = async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json({ message: 'Students list retrieved successfully', students });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  exports.getStudentById = async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid student ID' });
      }
      const student = await Student.findById(id);  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json({ message: 'Student retrieved successfully', student });
    } catch (error) {
     
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };