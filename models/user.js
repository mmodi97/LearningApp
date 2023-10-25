const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userid:{
    type: String
  },
  email: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  profilepicture:{
    type: String
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  parentName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dob:{
    type:String,
    required:true
  },
  type: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  alternatemobile:{
    type: String,
    required: true
  },

  country:{
    type: String,
    required:true
  },
  grade:{
    type: String,
    default:"NA"
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  badges:[
    {
      type:Schema.Types.ObjectId,
      ref:'Badges'
    }
  ],
  coursesEnrolled:[
    {
      type:Schema.Types.ObjectId,
      ref:'SecCourse'
    }
  ],
  coursesTeaching:[
    {
      type:Schema.Types.ObjectId,
      ref:'SecCourse'
    }
  ],
  enrolledStudents:[
    {
      type:Schema.Types.ObjectId,
      ref:'User'
    }
  ],
  enrolledFaculty:[
    {
      type:Schema.Types.ObjectId,
      ref:'User'
    }
  ],
  notifications:[
    {
      type:Schema.Types.ObjectId,
      ref:'Notification'
    }
  ],
  socialProfiles:[
    {
      type:Schema.Types.ObjectId,
      ref:'Social'
    }
  ],
  timezone:{
    type: String,
    required:true
  },
  disableAccount:{
    type: Boolean,
    default:false
  },
  subscription:{
    type: String,
    default:"DEMO"
  },
  payments:[
    {
      type:Schema.Types.ObjectId,
      ref:'Payment'
    }
  ],
  payouts:[
    {
      type:Schema.Types.ObjectId,
      ref:'Payout'
    }
  ]

});

module.exports = mongoose.model('User', userSchema);
