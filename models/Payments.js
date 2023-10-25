const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new Payment creation
const payments = new Schema({
  user_id:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  description:{
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  remainingamount: {
    type: String,
    required: true
  },
  payment_date: {
    type: String,
    required: true
  },
  payment_method:{
    type:String,
    required: true
  },
  payment_status:{
    type:String,
    required: true
  }
},{ timestamps: true });

module.exports = mongoose.model('Payment', payments);
