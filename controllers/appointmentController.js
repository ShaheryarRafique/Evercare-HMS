const sql = require('../db');

exports.getAllAppointments = function (req, res) {

    let query = 'call GetAllAppointment();';

    sql.query(query, (err, appointments) => {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }
        const appointment = appointments[0];
        console.log(appointment);
        res.status(200).render('viewappointments', {
            appointment
        });
    });
};

exports.getAppointments = function (req, res) {

    let query = `select Appointment_id, appointmentDate, fee, patient_id, doctor_id from Appointment where Appointment_id = ${req.params.id}`;

    sql.query(query, function (err, app) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }
        console.log(app);
        res.status(200).render('edit_appointment', {
            app
        });
        console.log("Appointment get Successfully !");

    });
};

exports.createAppointments = function (req, res) {

    const {
        pat_id,
        doc_id,
        date,
        salary
    } = req.body;

    let query1 = 'select patient_id from Patient where patient_id = ?';
    let query2 = 'select doctor_id, Dept_id from Doctor where doctor_id = ?';
    let query3 = 'insert into Appointment(appointmentDate, fee, patient_id, doctor_id) values (?, ?, ?, ?)';

    let replace, message, status;

    sql.query(query1, [pat_id], function (err, app) {

        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }

        if (app.length <= 0) {

            replace = 'danger';
            message = 'Please enter correct Patient ID.';
            status = "Fail"
            return res.render('add-appointment', {
                message,
                replace,
                status
            });
        } else {
            sql.query(query2, [doc_id], function (err, app1) {
                if (err) {
                    const errName = err.message;
                    return res.status(400).render('error400', {
                        errName
                    });
                }

                console.log(app1[0].Dept_id);
                if (app1.length <= 0) {

                    replace = 'danger';
                    message = 'Please enter correct Doctor ID.';
                    status = "Fail"
                    return res.render('add-appointment', {
                        message,
                        replace,
                        status
                    });

                } else if (!app1[0].Dept_id) {
                    
                    replace = 'danger';
                    message = 'This Doctor is not assigned to any Department yet. Choose another Doctor.';
                    status = "Fail"
                    return res.render('add-appointment', {
                        message,
                        replace,
                        status
                    });
                } else {
                    sql.query(query3, [date, salary, pat_id, doc_id], function (err) {
                        if (err) {
                            const errName = err.message;
                            return res.status(400).render('error400', {
                                errName
                            });
                        } else {
                            replace = 'success';
                            message = 'Appointment has been successfully added';
                            status = "Success";
                            return res.status(200).render('add-appointment', {
                                message,
                                replace,
                                status
                            });
                        }
                    });
                }
            });
        }
    });
}

exports.deleteAppointments = function (req, res) {

    let query = `call deleteAppointment(${req.params.id})`;
    console.log(query)

    sql.query(query, req.body, function (err) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }
        res.redirect('/api/v1/appointments');
        console.log("Appointment deleted Successfully !");
    });

};

exports.updateAppointments = function (req, res) {

    const {
        pat_id,
        doc_id,
        date,
        salary
    } = req.body;
    const id = req.params.id;
    console.log(req.body)

    let query = 'update Appointment SET appointmentDate = ?, fee = ?, patient_id = ?, doctor_id = ?  WHERE Appointment_id = ?';

    sql.query(query, [date, salary, pat_id, doc_id, id], function (err) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }

        let replace = 'success';
        let status = "Success";

        res.status(201).render('add-appointment', {
            message: 'Your Appointment has been updated Successfully !',
            replace,
            status
        });
        console.log("Appointment updated Successfully !");
    });
};