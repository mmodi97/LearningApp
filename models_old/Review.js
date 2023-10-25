const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new course creation
const review = new Schema({
  student_id:[{
    type:Schema.Types.ObjectId,
    ref:'User'
}],
  rating: {
    type: Number,
    required: true
  },
  comments: {
    type: String,
    required: true
  }
},{ timestamps: true });

module.exports = mongoose.model('Review', review);
