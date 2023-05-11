const sql = require('../db');
const patientModel = require('../features/patientModel');

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
            return res.render('addPatAppt', {
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
                    return res.render('addPatAppt', {
                        message,
                        replace,
                        status
                    });

                } else if (!app1[0].Dept_id) {
                    
                    replace = 'danger';
                    message = 'This Doctor is not assigned to any Department yet. Choose another Doctor.';
                    status = "Fail"
                    return res.render('addPatAppt', {
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
                            return res.status(200).render('addPatAppt', {
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

exports.getPatientInfo = function (req, res, next) {

    let query = `select * from Patient where patient_id = ${req.user.id}`;
    console.log(query);

    sql.query(query, function (err, patient) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {errName});
        }
        res.status(200).render('view-patient-info', {patient});
        console.log("Patient get Successfully !");
        
    });
};


exports.viewAppointment = function(req, res, next) {

    let query = `select * from Appointment where patient_id = ${req.user.id}`;
    sql.query(query, (err, appointment) => {
        if (err) {
            const errName = err.name;
            return res.status(400).render('error400', {
                errName
            });
        }
        console.log(appointment)
        res.status(200).render('viewPatAppt', {
            appointment
        });
    });
}

exports.getAllPatients = function (req, res) {

    let query = 'call GetAllPatient();';

    sql.query(query, (err, patients) => {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }
        const patient = patients[0];
        res.status(200).render('viewpatients', {
            patient
        });
    });
};

exports.getPatient = function (req, res) {
    
    let query = `select patient_id, name, phone, sickness, address from Patient where patient_id = ${req.params.id}`;

    sql.query(query, function (err, patient) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {errName});
        }
        res.status(200).render('edit_patient', {patient});
        console.log("Patient get Successfully !");
    });
};

exports.deletePatient = function (req, res) {
    
    let query = `call deletePatient(${req.params.id})`;

    sql.query(query, req.body, function (err) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {errName});
        }
         res.redirect('/api/v1/patients');
         console.log("Patient deleted Successfully !");
    });
};

exports.updatePatient = function (req, res) {

    const {name, Sickness, phone, address} = req.body;
    const id = req.params.id;

    let query = 'update Patient SET name = ?, sickness = ?, phone = ?, address = ? WHERE patient_id = ?';

    sql.query(query, [name, Sickness, phone, address, id], function (err) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {errName});
        }

       let replace = 'success';
       let status = "Success";

        res.status(201).render('add_patient', {message: 'Your Patient has been updated Successfully !', replace, status});
        res.redirect('/api/v1/patients');
        console.log("Patient updated Successfully !");
    });
};

exports.createPatient = function (req, res) {

    console.log("Inside Create Patient");

    const {
        name,
        email,
        password,
        Confirmpassword,
        Sickness,
        gender,
        date,
        phone,
        registration,
        address
    } = req.body;

    let query = "Select email from Patient where email = ?";

    let replace, message, status;

    sql.query(query, [email], function (err, pat) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }

        if (pat.length > 0) {
            replace = 'danger';
            message = 'This email has already been registered';
            status = "Fail"
            return res.render('add_patient', {
                message,
                replace,
                status
            });

        } else if (password !== Confirmpassword) {
            replace = 'danger';
            message = 'It does not match with password before';
            status = "Fail"
            return res.render('add_patient', {
                message,
                replace,
                status
            });

        } else if (password.length < 5 || password.length > 20) {
            replace = 'danger';
            message = 'Your password must be 5-20 characters long, contain letters and numbers, and must not contain spaces special characters or emoji';
            status = "Fail";
            return res.render('add_patient', {
                message,
                replace,
                status
            });
        } else {

            let patient = new patientModel(name, email, password, Sickness, gender, date, phone, address, registration);
            let query = 'INSERT INTO Patient SET ?';

            sql.query(query, patient, function (err, doctor) {
                if (err) {
                    const errName = err.message;
                    return res.status(400).render('error400', {
                        errName
                    });
                } else {
                    replace = 'success';
                    message = 'Patient has been successfully added';
                    status = "Success";
                    return res.status(200).render('add_patient', {
                        message,
                        replace,
                        status
                    });
                }

            });
        }
    });
}

exports.register = function (req, res) {

    const {
        name,
        email,
        password,
        Confirmpassword,
        Sickness,
        gender,
        date,
        phone,
        registration,
        address
    } = req.body;

    console.log("Inside Register");

    let query = "Select email from Patient where email = ?";

    let replace, message, status;

    sql.query(query, [email], function (err, pat) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }

        if (pat.length > 0) {
            replace = 'danger';
            message = 'This email has already been registered';
            status = "Fail"
            return res.render('registration', {
                message,
                replace,
                status
            });

        } else if (password !== Confirmpassword) {
            replace = 'danger';
            message = 'It does not match with password before';
            status = "Fail"
            return res.render('registration', {
                message,
                replace,
                status
            });

        } else if (password.length < 5 || password.length > 20) {
            replace = 'danger';
            message = 'Your password must be 5-20 characters long, contain letters and numbers, and must not contain spaces special characters or emoji';
            status = "Fail";
            return res.render('registration', {
                message,
                replace,
                status
            });
        } else {

            let patient = new patientModel(name, email, password, Sickness, gender, date, phone, address, registration);
            let query = 'INSERT INTO Patient SET ?';

            sql.query(query, patient, function (err, doctor) {
                if (err) {
                    const errName = err.message;
                    return res.status(400).render('error400', {
                        errName
                    });
                } else {
                    replace = 'success';
                    message = 'Patient has been successfully added';
                    return res.status(200).render('registration', {
                        message,
                        replace
                    });
                }
            });
        }
    });
}