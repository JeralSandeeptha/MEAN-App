const CustomerSchema = require('../models/Customer');

const saveCustomer = (req, res) => {
    const customer = new CustomerSchema({
        name: req.body.name,
        address: req.body.address,
        salary: req.body.salary
    });
    customer.save()
        .then( () => {
            res.json({
                data: {
                    status: 201, //created
                    message: 'Customer Saved'
                }
            });
        })
        .catch( (error) => {
            console.log(error);
            res.json(error);
        });
}

const updateCustomer = (req, res) => {
    CustomerSchema.findOneAndUpdate({
        _id: req.headers.id
    },{
        $set: {
            name: req.body.name,
            address: req.body.address,
            salary: req.body.salary
        }
    })
        .then( () => {
            res.json({
                data: {
                    status: 201, //created
                    message: 'Customer Updated'
                }
            });
        })
        .catch( (error) => {
            console.log(error);
            res.json(error);
        });
}

const deleteCustomer = (req, res) => {
    CustomerSchema.findOneAndDelete({_id: req.headers.id})
        .then( () => {
            res.json({
                data: {
                    status: 201, //created
                    message: 'Customer Deleted'
                }
            });
        })
        .catch( (error) => {
            console.log(error);
            res.json(error);
        });
}

const getCustomer = (req, res) => {
    CustomerSchema.findOne({_id: req.headers.id})
        .then( (result) => {
            res.json({
                data: {
                    status: 201, //created
                    message: 'Customer Find'
                },
                value: result
            });
        })
        .catch( (error) => {
            console.log(error);
            res.json(error);
        });
}

const getAllCustomer = (req, res) => {
    CustomerSchema.find()
        .then( (result) => {
            res.json({
                data: {
                    status: 201, //created
                    message: 'Customer Find',
                    value: result
                },
            });
        })
        .catch( (error) => {
            console.log(error);
            res.json(error);
        });
}

module.exports = {
    saveCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomer,
    getCustomer
}