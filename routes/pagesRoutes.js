const express = require('express');

const routers = express.Router();

routers
    .get('/', function (req, res) {
        res.render('index');
    })
    .get('/LoginDoctor', function(req, res){
        res.render('LoginDoctor')
    })
    .get('/LoginPatient', function(req, res){
        res.render('LoginPatient')
    })
    .get('/LoginAdmin', function(req, res){
        res.render('LoginAdmin')
    })
    .get('/register', function(req, res){
        res.render('registration')
    })
    .get('/adminDashboard', function(req, res){
        res.render('adminDashboard');
    })
    .get('/about', function(req, res){
        res.render('about')
    })
    .get('/contact', function(req, res){
        res.render('contact')
    })
    .get('/error401', function(req, res){
        res.render('error401');
    })
    .get('/addDepartment', function(req, res){
        res.render('add_Department');
    })
    .get('/editDepartment/:id', function(req, res){
        res.render('edit_department');
    })
    .get('/addDoctor', function(req, res){
        res.render('add_doctor');
    })
    .get('/addPatient', function(req, res){
        res.render('add_patient');
    })
    .get('/addAppointment', function(req, res){
        res.render('add-appointment');
    })
    .get('/addPrescription', function(req, res){
        res.render('add_prescription');
    })
    .get('/addRoom', function(req, res){
        res.render('add_room');
    })
    .get('/doctorDashboard', function(req, res){
        res.render('doctorDashboard');
    })
    .get('/patientDashboard', function(req, res){
        res.render('patientDashboard');
    })
    .get('/add/Appointment', function(req, res){
        res.render('addPatAppt');
    })


module.exports = routers;