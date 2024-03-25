// models/Exam.js
const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: {
    type: String,
 
  },
  subject: {
    type: String,
 
  },
  date: {
    type: Date,
   
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
 
  },
  duration: {
    type: Number,
   
  },
  
  
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
