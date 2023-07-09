const { Router } = require('express');
const express = require('express');

const CustomerController = require('../controllers/CustomerController');

const router = express.Router();

//save
router.post('/save', CustomerController.saveCustomer);

//getAll
router.get('/getAll', CustomerController.getAllCustomer);

//getOne
router.get('/getOne', CustomerController.getCustomer);

//update
router.put('/update', CustomerController.updateCustomer);

//delete
router.delete('/delete', CustomerController.deleteCustomer);

module.exports = router;