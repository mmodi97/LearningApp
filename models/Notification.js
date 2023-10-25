const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new notification creation
const notification = new Schema({
  type:{
    type:String,
    required:true
},
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default:false
  },
  redirectUrl:{
    type: String,
    required: true
  }
},{ timestamps: true });

module.exports = mongoose.model('Notification', notification);
