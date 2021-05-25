'use strict';
var express = require('express');
const path = require('path');
var router = express.Router();

/* GET main css file. */
router.get('/css/main', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/stylesheets/main.css'));
});

/*GET 404 css file*/
router.get('/css/404', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/stylesheets/404.css'));
});

/* GET logo. */
router.get('/images/logo', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/images/logo.png'));
});

/* GET map marker. */
router.get('/images/marker', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/images/marker.png'));
});

/*GET jquery */
router.get('/javascripts/jquery', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/javascripts/jquery.js'));
});

/*GET js files */
router.get('/javascripts/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/javascripts/dashboard.js'));
});

/*GET js files */
router.get('/javascripts/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/javascripts/login.js'));
});

/*GET js files */
router.get('/javascripts/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/javascripts/register.js'));
});

/*GET js files */
router.get('/javascripts/clients', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/javascripts/clients.js'));
});

/*GET js files */
router.get('/javascripts/employees', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/javascripts/employees.js'));
});

/*GET js files */
router.get('/javascripts/profile', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/javascripts/profile.js'));
});




module.exports = router;
