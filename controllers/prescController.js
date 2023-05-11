const sql = require('../db');

exports.getAllPrescriptions = function (req, res) {

    let query = 'select * from Prescription;';

    sql.query(query, (err, presc) => {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }
        console.log(presc);
        res.status(200).render('viewPrescription', {
            presc
        });
    });
};

exports.getPrescriptions = function (req, res) {

    let query = `select presc_id, prescriptionDate, description from Prescription where presc_id = ${req.params.id}`;

    sql.query(query, function (err, presc) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }
        console.log(presc);
        res.status(200).render('edit_prescription', {
            presc
        });
        console.log("prescription get Successfully !");

    });
};


exports.updatePrescriptions = function (req, res) {

    const {
        date,
        description
    } = req.body;
    const id = req.params.id;
    console.log(req.body)

    let query = 'update Prescription SET prescriptionDate = ?, description = ?  WHERE presc_id = ?';

    sql.query(query, [date, description, id], function (err) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }

        let replace = 'success';
        let status = "Success";

        res.status(201).render('add_prescription', {
            message: 'Your Prescription has been updated Successfully !',
            replace,
            status
        });
        console.log("Prescription updated Successfully !");
    });
};

exports.createPrescriptions = function (req, res) {

    const {
        pat_id,
        doc_id,
        app_id,
        date,
        description
    } = req.body;

    let query1 = 'select patient_id, doctor_id, Appointment_id from Appointment where Appointment_id = ?';
    let query2 = 'insert into Prescription(prescriptionDate, description, patient_id, doctor_id, Appointment_id) values (?, ?, ?, ?, ?)';

    let replace, message, status;

    sql.query(query1, [app_id], function (err, app) {

        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }

        console.log(app[0].patient_id + '<--Patient --- Doctor-->' + app[0].doctor_id)

        if (app.length <= 0) {

            replace = 'danger';
            message = 'Please enter correct Appointment ID.';
            status = "Fail"
            return res.render('add_prescription', {
                message,
                replace,
                status
            });
        } else if (app[0].patient_id != pat_id) {

            replace = 'danger';
            message = 'Please enter correct Patient ID against that Appointment ID.';
            status = "Fail"
            return res.render('add_prescription', {
                message,
                replace,
                status
            });
        } else if (app[0].doctor_id != doc_id) {

            replace = 'danger';
            message = 'Please enter correct Doctor ID against that Appointment ID.';
            status = "Fail"
            return res.render('add_prescription', {
                message,
                replace,
                status
            });
        } else {
            sql.query(query2, [date, description, pat_id, doc_id, app_id], function (err) {
                if (err) {
                    const errName = err.message;
                    return res.status(400).render('error400', {
                        errName
                    });
                } else {
                    replace = 'success';
                    message = 'Prescription has been successfully added';
                    status = "Success";
                    return res.status(200).render('add_prescription', {
                        message,
                        replace,
                        status
                    });
                }
            });
        }
    });
}

exports.deletePrescriptions = function (req, res) {

    let query = `delete from Prescription where presc_id = (${req.params.id})`;
    console.log(query)

    sql.query(query, req.body, function (err) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }
        res.redirect('/api/v1/prescriptions');
        console.log("Prescription deleted Successfully !");
    });

};
