const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create new inquiry creation
const inquiry = new Schema({
    enquiryId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'PCourse'
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    availabitytime: {
        type: String,
        required: true
    },
    mobileno: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
    ,
    status: {
        type: String,
        default: "PENDING"
    }
}, { timestamps: true });

module.exports = mongoose.model('Enquiries', inquiry);
