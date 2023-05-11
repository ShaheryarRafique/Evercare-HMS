const sql = require('../db');
const jwt = require('jsonwebtoken');

const assignToken = (id) => {
    const token = jwt.sign({
        id: id
    }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
};

const createSendToken = (user, statusCode, res, person) => {

    let token;

    if (person == 'Patient') token = assignToken(user[0].patient_id);
    else if (person == 'Doctor') token = assignToken(user[0].doctor_id);
    else if (person == 'Admin') token = assignToken(user[0].admin_id);

    const cookieOptions = {
        httpOnly: true
    }
    cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    if(person == 'Admin') res.status(statusCode).redirect('/adminDashboard');
    else if(person == 'Doctor') res.status(statusCode).redirect('/doctorDashboard');
    else if(person == 'Patient') res.status(statusCode).redirect('/patientDashboard');
};

exports.Login = (...roles) => {
    return (req, res, next) => {
        const {
            username,
            pass
        } = req.body;

        if (!username || !pass) {

            return res.status(400).render(`login${roles[0]}`, {
                message: 'Please enter proper email or password !'
            });
        }

        let sqlQuery = `Select * from ${roles[0]} where email = ? and password = ?`;

        sql.query(sqlQuery, [username, pass], function (err, results) {

            if (results.length <= 0) {
                let message = 'Please enter proper email or password !';
                return res.status(400).render(`login${roles[0]}`, {
                    message
                });
            } else {
                createSendToken(results, 200, res, `${roles[0]}`);
                
            }
        });
    }
}

exports.protected = function (req, res, next) {

    let token;
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (token == null) {
        return res.status(401).redirect('/error401')
    }
 
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie('jwt');
        return res.redirect('/error401');
    }
}

exports.Logout = (...roles) => {
    return (req, res) => {
        res.clearCookie('jwt');
        if(roles == 'Admin') return res.redirect('/LoginAdmin');
        if(roles == 'Doctor') return res.redirect('/LoginDoctor');
        if(roles == 'Patient') return res.redirect('/LoginPatient');
    }
}
