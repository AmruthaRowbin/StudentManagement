const express = require('express')
const app = express()

app.use(express.json());
const mongoose = require('mongoose');
const port = 3000

const studentRouter=require('./routes/student')
const examRouter=require('./routes/exam')
const classroomRouter=require('./routes/classroom')
const examresultsRouter=require('./routes/examResults')
const adminRouter=require('./routes/admin')
require('dotenv').config();
const mongoURI = process.env.MongoURl;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB has been started successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/',studentRouter)
app.use('/',examRouter)
app.use('/',classroomRouter)
app.use('/',examresultsRouter)
app.use('/',adminRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})