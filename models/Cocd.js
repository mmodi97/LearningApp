const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cocdSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
}
);

module.exports = mongoose.model('COCD', cocdSchema);
