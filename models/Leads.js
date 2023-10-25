const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new inquiry creation
const leads = new Schema({

lead:  {
    type:Schema.Types.ObjectId,
    ref:'Enquiry'
},
status:{
    type: String,
    default:"OPEN"
}
},{ timestamps: true });

module.exports = mongoose.model('Leads', leads);
