const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new primary course creation
const pCourseSchema = new Schema({
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
  enrolledStudents:{
    type: String,
    required: true
  },
  
  totalClasses:{
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
  publishedDate:{
    type:String,
    required:true
  },
  reviews:[
    {
        type:Schema.Types.ObjectId,
        ref:'Review'
    }
  ],
  resources:[
    {
        type:Schema.Types.ObjectId,
        ref:'Resource'
    }
  ]
  
});

module.exports = mongoose.model('PCourse', pCourseSchema);
