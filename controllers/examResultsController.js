const ExamResult = require('../models/exam_result')
const Student=require('../models/student')

const Joi = require('joi');

const examResultSchema = Joi.object({
    studentId: Joi.string().required(),
    score: Joi.number().required(),
    examId: Joi.string().required(),
    
  });

//To recored exam result
exports.recordExamResult = async (req, res) => {
    try {
        const { error } = examResultSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
        const { studentId, examId, score } = req.body;
        const existingResult = await ExamResult.findOne({ student: studentId, exam: examId });
        if (existingResult) {
            return res.status(400).json({ error: 'An exam result already exists for this student and exam' });
        }
        
        // Create the exam result
        const examResult = await ExamResult.create({ student: studentId, exam: examId, score });
        
        res.status(201).json({ message: 'Exam result recorded successfully', examResult });
    } catch (err) {
        res.status(400).json({ message: 'Failed to record exam result', error: err.message });
    }
};


//to update exam result
exports.updateExamResult = async (req, res) => {
    try {
        const { score, studentId, examId } = req.body;
        const { error: scoreError } = Joi.number().integer().min(0).max(100).required().validate(score);
        if (scoreError) {
            return res.status(400).json({ error: scoreError.details[0].message });
        }
        const examResult = await ExamResult.findById(req.params.id);
        if (!examResult) {
            return res.status(404).json({ message: 'Exam result not found' });
        }
        const student = await Student.findById(studentId).populate('exams');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const hasExam = student.exams.some(exam => exam.equals(examId));
        if (!hasExam) {
            return res.status(400).json({ error: 'The student does not have this exam type' });
        }

        // Update the exam result fields
        examResult.score = score;
        examResult.student = studentId;
        examResult.exam = examId;
        await examResult.save();
        
        res.status(200).json({ message: 'Exam result updated successfully', examResult });
    } catch (err) {
        res.status(400).json({ message: 'Failed to update exam result', error: err.message });
    }
};

//To Retrieved exam result successfully

exports.getExamResultById = async (req, res) => {
    try {

        const examResult = await ExamResult.findById(req.params.id).populate('student', 'name').populate('exam', 'subject');

        if (!examResult) {
            return res.status(404).json({ message: 'Exam result not found' });
        }

        res.status(200).json({ message: 'Retrieved exam result successfully', examResult });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve exam result', error: err.message });
    }
};


// To Retrieved all results for the specified exam

exports.getAllResultsForSpecificExam = async (req, res) => {
    try {
        const { examId } = req.query;

        if (!examId) {
            return res.status(400).json({ message: 'ExamId parameter is required' });
        }

        const results = await ExamResult.find({ exam: examId }).populate('student', 'name').populate('exam', 'subject').exec();

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No results found for the specified examId' });
        }

        res.status(200).json({ message: 'Retrieved all results for the specified exam', results });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve results for the specified exam', error: err.message });
    }
};




//To delete exam result
exports.deleteExamResult = async (req, res) => {
    try {
        const deletedExamResult = await ExamResult.findByIdAndDelete(req.params.id);

        if (!deletedExamResult) {
            return res.status(404).json({ message: 'Exam result not found' });
        }

        res.status(200).json({ message: 'Exam result deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete exam result', error: err.message });
    }
};