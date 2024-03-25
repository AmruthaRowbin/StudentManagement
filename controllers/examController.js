const Exam = require('../models/exam')

const Joi = require('joi');
const examSchema = Joi.object({
    title: Joi.string().required(),
    subject: Joi.string().required(),
    date: Joi.date().required(),
    classroomId: Joi.string().required(),
   
  });



// to create an exam
exports.createExam = async (req, res) => {
    try {

        const { error } = examSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
        const { title, date, subject,classroomId } = req.body;
        const exam = new Exam({ title, date,subject,classroom:classroomId});
        await exam.save();
        res.status(201).json({ message: 'Exam created successfully', exam });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// to update an exam
exports.updateExam = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, duration } = req.body;
        const updatedExam = await Exam.findByIdAndUpdate(id, { title, date, duration }, { new: true });
        if (!updatedExam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json({ message: 'Exam updated successfully', exam: updatedExam });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// to delete an exam
exports.deleteExam = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExam = await Exam.findByIdAndDelete(id);
        if (!deletedExam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json({ message: 'Exam deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//  to get a list of all exams
exports.getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.json({ exams });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//  to get details of a single exam
exports.getExamById = async (req, res) => {
    try {
        const { id } = req.params;
        const exam = await Exam.findById(id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json({ exam });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
