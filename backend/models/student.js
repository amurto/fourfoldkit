const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  college: { type: String },
  attendance: [],
  marks: [],
  applied: [],
  resume: []
});

studentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Student', studentSchema);
