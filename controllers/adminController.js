const sql = require('../db');

exports.getAdmin = function (req, res, next) {

    let query = `select * from Admin where admin_id = ${req.user.id}`;
    console.log(query);

    sql.query(query, function (err, admin) {
        if (err) {
            const errName = err.message;
            return res.status(400).render('error400', {errName});
        }
        res.status(200).render('view-Admin-info', {admin});
        console.log("Admin get Successfully !");
        
    });
};
