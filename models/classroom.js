// models/Classroom.js
const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  capacity: {
    type: Number, 
  },
  floor: {
    type: Number,
   
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  exams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }]
  
 
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
