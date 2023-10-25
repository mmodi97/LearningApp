const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new course creation
const attendance = new Schema({
  student_id:{
    type:Schema.Types.ObjectId,
    ref:'User'
},
courseId:{
    type:Schema.Types.ObjectId,
    ref:'SecCourse'
},

attendance: {
    type: String,
    required: true
  },
date:{
  type: String,
  required: true
},
approved: {
  type: Boolean,
  default:false
},
},{ timestamps: true });

module.exports = mongoose.model('Attendance', attendance);
