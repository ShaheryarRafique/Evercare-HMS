const sql = require('../db');

exports.getAllDepartments = function(req, res) {
    
    let query = 'call GetAllDepartment();';

    sql.query(query, (err, departments) => {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {errName});
        }
        const department = departments[0];
        res.status(200).render('viewdepartments', {department});
    });
};

exports.getDepartments = function(req, res) {

    let query = 'select * from Department where dept_id = ?'

    sql.query(query, [req.params.id], function (err, department) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {errName});
        }

        res.status(200).render('edit_department', {department});
        console.log("Department get Successfully !");
    });

};

exports.createDepartments = function(req, res) {

    const {name, address, head, rooms} = req.body;

    let query = `insert into Department (Dept_id, name, address, HOD, totalRooms) values (?, ?, ?, ?, ?)`;

    sql.query(query, [0, name, address, head, rooms], function (err) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {errName});
        };

        res.status(200).render('add_department', {message: 'Your department has been added Successfully !'});

        console.log('Department is added successfully !');
    });
};

exports.deleteDepartments = function(req, res) {

    let query = `call deleteDepartment(${req.params.id})`;
    console.log(query)

    sql.query(query, req.body, function (err) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {errName});
        }
         res.redirect('/api/v1/departments');
         console.log("Department deleted Successfully !");
    });
};

exports.updateDepartments = function(req, res) {
   
    const {name, address, head, rooms} = req.body;
    const id = req.params.id;
    let query = `call updateDepartment('${name}', '${address}', '${head}', ${rooms}, ${id});`;

    console.log(query);

    sql.query(query, function (err) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {errName});
        }
        res.redirect('/api/v1/departments');
        console.log("Department updated Successfully !");
    });
};