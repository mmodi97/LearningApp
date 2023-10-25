const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new course creation
const social = new Schema({
  type: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
},{ timestamps: true });

module.exports = mongoose.model('Social', social);
