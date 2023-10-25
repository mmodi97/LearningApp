const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new course creation
const secCourseSchema = new Schema({
  courseId:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  teacher_id: {
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  primarycourse:{
    type:Schema.Types.ObjectId,
    ref:'Course'
  },
  startDate:{
    type: String,
    required: true
  },
  totalClasses:{
    type: String,
    required: true
  },
  enrolledClasses:{
    type: String,
    required: true
  },
  disable:{
    type:Boolean,
    default:false
  },
  price:{
    type:String,
    required:true
  },
  paymentreceipt:{
    type:String,
    required:true
  },
  approved:{
    type:Boolean,
    required:true,
    default:true
  },
  attendedClasses:{
    type: String,
    default:"0"
  }
  
});

module.exports = mongoose.model('SecCourse', secCourseSchema);
