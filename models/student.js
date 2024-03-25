const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

  name: {
    type: String,

  },
  age: {
    type: Number,

  },
  email: {
    type: String,

  },
  address: {
    type: String,

  },
  roll_no: {
    type: String,

  },
  phone_no: {
    type: String,

  },
  guardian_name: {
    type: String,


  },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },

});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

