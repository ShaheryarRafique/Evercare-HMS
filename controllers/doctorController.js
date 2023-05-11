const sql = require('../db');


exports.getDoctorInfo = function (req, res, next) {

    let query = `select * from Doctor where doctor_id = ${req.user.id}`;
    console.log(query);

    sql.query(query, function (err, doctor) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {errName});
        }
        res.status(200).render('view-doctor-info', {doctor});
        console.log("Doctor get Successfully !");
        
    });
};

exports.viewAppointment = function(req, res, next) {

    let query = `select * from Appointment where doctor_id = ${req.user.id}`;
    sql.query(query, (err, appointment) => {
        if (err) {
            const errName = err.name;
            return res.status(400).render('error400', {
                errName
            });
        }
        console.log(appointment)
        res.status(200).render('viewDocAppt', {
            appointment
        });
    });
}

exports.getAllDoctors = function (req, res, next) {

    let query = 'call doctors();';
    sql.query(query, (err, doctors) => {
        if (err) {
            const errName = err.name;
            return res.status(400).render('error400', {
                errName
            });
        }
        const doctor = doctors[0];
        console.log(doctor)
        res.status(200).render('viewdoctors', {
            doctor
        });
    });
};

exports.themeDoctors = function (req, res, next) {
    let query = `select Doctor.name , Department.name as 'Department' from Doctor, Department  where Doctor.dept_id = Department.dept_id;`;

    sql.query(query, (err, doctors) => {
        if (err) {
            const errName = err.name;
            return res.status(400).render('error400', {
                errName
            });
        }
        res.status(200).render('doctors', {
            doctors
        });
    });
}

exports.createDoctor = function (req, res, next) {

    let {
        email,
        password,
        Confirmpassword,
        DOB
    } = req.body;

    let query = "Select email from Doctor where email = ?";

    let replace, message, status;

    sql.query(query, [email], function (err, doctor) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }

        if (doctor.length > 0) {
            replace = 'danger';
            message = 'This email has already been registered';
            status = "Fail"
            return res.render('add_doctor', {
                message,
                replace, status
            });

        } else if (password !== Confirmpassword) {
            replace = 'danger';
            message = 'It does not match with password before';
            status = "Fail"
            return res.render('add_doctor', {
                message,
                replace,
                status
            });

        } else if (password.length < 5 || password.length > 20) {
            replace = 'danger';
            message = 'Your password must be 5-20 characters long, contain letters and numbers, and must not contain spaces special characters or emoji';
            status = "Fail";
            return res.render('add_doctor', {
                message,
                replace,
                status
            });
        } else {

            let {
                name,
                speciality,
                department,
                salary,
                gender,
                patientExamined,
                address
            } = req.body;

            let dept_id = null;

            if (department !== undefined || null) {

                let query = 'select Department.dept_id from Department where Department.name = ?';
                sql.query(query, [department], function (err, dept) {

                    dept_id = dept[0].dept_id;
                    let query = 'INSERT INTO Doctor(name, email, password, speciality, gender, salary, DOB , address, patientExamined, dept_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

                    sql.query(query, [name, email, password, speciality, gender, salary, '2006/12/4', address, patientExamined, dept_id], function (err, doctor) {
                        if (err) {
                            const errName = err.message;
                            return res.status(400).render('error400', {
                                errName
                            });
                        } else {
                            replace = 'success';
                            message = 'Doctor has been successfully added';
                            status = "Success";
                            return res.status(200).render('add_doctor', {
                                message,
                                replace,
                                status
                            });
                        }
        
                    });        
                })
            }

    }
    });
};

exports.getDoctor = function (req, res, next) {

    let query = `select doctor_id, name, speciality, gender, salary, address, patientExamined from Doctor where doctor_id = ${req.params.id}`;

    sql.query(query, function (err, doctor) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {errName});
        }
        res.status(200).render('edit_doctor', {doctor});
        console.log("Doctor get Successfully !");
        
    });
};

exports.updateDoctor = function (req, res, next) {

    const {name, speciality, gender, salary, address, patientExamined} = req.body;
    const id = req.params.id;

    let query = 'update Doctor SET name = ?, speciality = ?, salary = ?, address = ?, patientExamined = ?, gender = ? WHERE doctor_id = ?';

    sql.query(query, [name, speciality, salary, address, patientExamined, gender, id], function (err) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {errName});
        }

       let replace = 'success';
       let status = "Success";

        res.status(201).render('add_doctor', {message: 'Your doctor has been updated Successfully !', replace, status});
        console.log("Doctor updated Successfully !");
    });
}

exports.deleteDoctor = function (req, res, next) {
    let query = `call deleteDoctor(${req.params.id})`;
    console.log(query)

    sql.query(query, req.body, function (err) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {errName});
        }
         res.redirect('/api/v1/doctors');
         console.log("Doctor deleted Successfully !");
    });
}
