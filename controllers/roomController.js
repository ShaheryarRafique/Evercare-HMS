const sql = require('../db');

exports.getAllRooms = function (req, res) {

    let query = 'call getRoom();';

    sql.query(query, (err, rooms) => {
        if (err) {
            const errName = err.message;
            console.error(err)
            return res.status(400).render('error400', {
                errName
            });
        }
        const room = rooms[0];
        res.status(200).render('viewRooms', {
            room
        });
    });
};

exports.getRooms = function (req, res) {

    let query = `select * from Room where room_id = ${req.params.id}`;

    sql.query(query, function (err, room) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }
        console.log(room);
        res.status(200).render('edit_room', {
            room
        });
        console.log("Room get Successfully !");

    });
};


exports.updateRooms = function (req, res) {

    const {
        name,
        type,
        doc_id,
        status
    } = req.body;

    const id = req.params.id;
    console.log(req.body)
    
    let replace, message, statuses;

    let query1 = 'select doctor_id from Doctor where doctor_id = ?';
    let query = 'update Room SET name = ?, roomType = ?, doctor_id = ?, avaliabilityStatus = ?  WHERE room_id = ?';

    sql.query(query1, [doc_id], function (err, doc) {

        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }

        console.log('<--- Doctor-->' + doc.length)

        if (doc.length <= 0) {

            replace = 'danger';
            message = 'Please enter correct Doctor ID.';
            statuses = "Fail"
            return res.render('edit_room', {
                message,
                replace,
                statuses
            });
        } else {

            sql.query(query, [name, type, doc_id, status, id], function (err) {
                if (err) {
                    const errName = err.message;
                    return res.status(400).render('error400', {
                        errName
                    });
                }

                let replace = 'success';
                let statuses = "Success";

                res.status(201).render('add_room', {
                    message: 'Your Room has been updated Successfully !',
                    replace,
                    statuses
                });
                console.log("Room updated Successfully !");
            });
        }
    });
};

exports.createRooms = function (req, res) {

    const {
        name,
        type,
        doc_id,
        dept_id,
        status
    } = req.body;

    console.log(req.body);

    let query1 = 'select doctor_id from Doctor where doctor_id = ?';
    let query2 = 'select dept_id from Department where dept_id = ?';
    let query3 = 'insert into Room(name, roomType, avaliabilityStatus, doctor_id, Dept_id) values (?, ?, ?, ?, ?)';

    let replace, message, statuses;

    sql.query(query1, [doc_id], function (err, doc) {

        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }

        console.log('<--- Doctor-->' + doc.length)

        if (doc.length <= 0) {

            replace = 'danger';
            message = 'Please enter correct Doctor ID.';
            statuses = "Fail"
            return res.render('add_room', {
                message,
                replace,
                statuses
            });
        } else {
            sql.query(query2, [dept_id], function (err, dept) {

                console.log('<--- Department-->' + dept.length)

                if (err) {
                    const errName = err.message;
                    return res.status(400).render('error400', {
                        errName
                    });
                } else if (dept.length <= 0) {

                    replace = 'danger';
                    message = 'Please enter correct Department ID.';
                    statuses = "Fail"
                    return res.render('add_room', {
                        message,
                        replace,
                        statuses
                    });
                } else {
                    sql.query(query3, [name, type, status, doc_id, dept_id], function (err) {
                        if (err) {
                            const errName = err.message;
                            return res.status(400).render('error400', {
                                errName
                            });
                        } else {
                            replace = 'success';
                            message = 'Room has been successfully added';
                            statuses = "Success";
                            return res.status(200).render('add_room', {
                                message,
                                replace,
                                statuses
                            });
                        }
                    });
                }
            });
        }
    });
}

exports.deleteRooms = function (req, res) {

    let query = `delete from Room where room_id = (${req.params.id})`;
    console.log(query)

    sql.query(query, req.body, function (err) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {
                errName
            });
        }
        res.redirect('/api/v1/Rooms');
        console.log("Room deleted Successfully !");
    });

};