const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new course creation
const resource = new Schema({
  title:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pdfurl: {
    type: String,
    required: true
  },
  videourl:{
    type:String
  }
},{ timestamps: true });

module.exports = mongoose.model('Resource', resource);
