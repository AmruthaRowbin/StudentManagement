
const mongoose = require('mongoose');

const examResultSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    score: { type: Number, required: true }
});

const ExamResult = mongoose.model('ExamResult', examResultSchema);

module.exports = ExamResult;
