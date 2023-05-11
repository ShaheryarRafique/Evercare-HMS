const express = require('express');
const app = express();
const path = require('path');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');

//File paths
const doctorRouter = require('./routes/doctorRoutes');
const patientRouter = require('./routes/patientRoutes');
const departmentRouter = require('./routes/departmentRoutes');
const prescRouter = require('./routes/prescriptionRoutes');
const apptRouter = require('./routes/appointmentRoutes');
const roomRouter = require('./routes/roomRoutes');
const adminRouter = require('./routes/adminRoutes')
const pagesRouter = require('./routes/pagesRoutes');
const authRouter = require('./routes/authRoutes');


const templateDirectory = path.join(__dirname, './templates/views');
const partialsDirectory = path.join(__dirname, './templates/partials');
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//HTML handlers bars
app.set('view engine', 'hbs');
app.set('views', templateDirectory);
hbs.registerPartials(partialsDirectory);

//Body parser, reading data from body into req.body
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
//cockie Parser
app.use(cookieParser());
//set the security http header
app.use(helmet());

//Routes middleware
app.use('/', pagesRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/departments', departmentRouter);
app.use('/api/v1/appointments', apptRouter);
app.use('/api/v1/prescriptions', prescRouter);
app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/admin', adminRouter);
app.all('*', function(req, res){
    res.render('pageNfound');
})

const port = 3000;
app.listen(port, function() {
    console.log('Server is listing on port ' + port);
});

module.exports = app;