'use strict';
var express = require('express');
const path = require('path');
const admin = require("firebase-admin");
var router = express.Router();
const database = admin.database();

/* GET home page. */
router.get('/', (req, res) => {
    const sessionCookie = req.cookies.session || "";

    admin.auth().verifySessionCookie(sessionCookie, true).then(() => {
        res.sendFile(path.join(__dirname + '/../public/index.html')); 
    }).catch((error) => {
        res.redirect("/login");
    });
});

/* GET login page. */
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/login.html')); 
});

/* GET Register page. */
router.get('/register/:id',async (req, res) => {
    const id = req.params.id;
    try {

        const register_ref = await database.ref("Register/" + id).once("value");
        const register_data = await register_ref.val();
        if (register_data) res.sendFile(path.join(__dirname + '/../public/register.html'));
        else res.redirect("/login");
    } catch {
        res.redirect("/login");
    }
});

/* GET employees page. */
router.get('/employees', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/employees.html'));
});

/* GET clients page. */
router.get('/clients', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/clients.html'));
});

/* GET profile page. */
router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/profile.html'));
});

/* GET main page */
router.get('/main', (req, res) => {
    const sessionCookie = req.cookies.session || "";

    admin.auth().verifySessionCookie(sessionCookie, true).then(() => {
        res.sendFile(path.join(__dirname + '/../public/main.html'));
    }).catch((error) => {
        res.redirect("/login");
    });
})


module.exports = router;
