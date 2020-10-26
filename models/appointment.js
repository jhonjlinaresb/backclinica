const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    status: {
        type: String,
        required: [true, 'Required field']
    },
    date: {
        type: String,
        required: [true, 'Required field']
    },
    observations: {
        type: String
    },
    dni: {
        type: String,
        required: true
    },
    dentist: {
        type: String,
        required: true
    }
})

const AppointmentModel = mongoose.model('appoinments', AppointmentSchema);

module.exports = AppointmentModel;