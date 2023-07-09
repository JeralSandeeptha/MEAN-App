const { Router } = require('express');
const express = require('express');

const UserController = require('../controllers/UserController');

const router = express.Router();

//save
router.post('/save', UserController.saveUser);

//login
router.post('/login', UserController.login);

//getAll
router.get('/getAll', UserController.getAllUsers);

//getOne
router.get('/getOne', UserController.getUser);

//update
router.put('/update', UserController.updateUser);

//delete
router.delete('/delete', UserController.deleteUser);

module.exports = router;