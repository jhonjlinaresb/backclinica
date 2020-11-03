const AppointmentModel = require('../models/appointment');
const adduserAppointment = async (req, res)  => {
        console.log(req.body);
        const appointment = await AppointmentModel({
            status: req.body.status,
            date: req.body.date,
            observations: req.body.observations,
            dentist: req.body.dentist,
            dni: req.params.dni
        }).save();
        res.status(201).send(appointment);
    }

    const deleteOne = async (req, res)  => {
        try {
             await AppointmentModel.findOneAndDelete({dni:req.params.dni})
            res.send({
                message: 'Delete cite',
            })
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'Error to delete the cite'
            })
            
        }
    }

    const userAppointments = async (req, res) => {
        try {
            const appointment = await AppointmentModel.find({
                dni: req.params.dni
            })
            res.send({
                appointment
            })
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'no se pueden mostrar las citas'
            })
            
        }
    }

module.exports = {adduserAppointment, 
                  deleteOne,
                  userAppointments};