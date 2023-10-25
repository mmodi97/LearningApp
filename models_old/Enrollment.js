const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new Enrollment creation
const enrollment = new Schema({
  student_id:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  course_id: {
    type:Schema.Types.ObjectId,
    ref:'Course'
  },
  enrollment_date: {
    type: String,
    required: true
  },
  payment_status:{
    type:String,
    required: true
  }
},{ timestamps: true });

module.exports = mongoose.model('Enrollment', enrollment);
