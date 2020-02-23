const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const jobSchema = new Schema({
    designation: { type: String, required: true },
    org: { type: String, required: true },
    salary: { type: Number, minlength: 6 },
    address: { type: String, required: true },
    info: { type: String, required: true },
    phone: { type: String, required: true},
    perks: [],
    openings: { type: Number, minlength: 6 },
    skills : [],
    deadline: { type: Date, required: true },
    date: {
        type: Date,
        default: Date.now
      },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Job', jobSchema);