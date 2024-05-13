const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    deductions: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
