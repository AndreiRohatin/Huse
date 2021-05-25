'use strict';
const express = require('express');

const { addUser,
    getUserList,
    getUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
} = require('../controllers/UserController');

var router = express.Router();

//Post methods
router.post('/User', addUser);
router.post('/loginUser', loginUser);

//Get methods
router.get('/Users', getUserList);
router.get('/User/:id', getUser);
router.get('/logoutUser', logoutUser);

//Update methods
router.put('/User/:id', updateUser);

//Delete methods
router.delete('/User/:id', deleteUser);

module.exports = router;
