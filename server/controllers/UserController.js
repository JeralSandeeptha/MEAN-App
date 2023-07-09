const UserSchema = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const saveUser = (req, res) => {

    UserSchema.findOne({email: req.body.email})
        .then( (existData) => {
            if(existData === null){

                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

                    const user = new UserSchema({
                        email: req.body.email,
                        password: hash,
                        fullName: req.body.fullName
                    });

                    user.save()
                    .then( () => {
                        const token = jwt.sign({ email: req.body.email, fullName: req.body.fullName }, 'secret', { expiresIn: '24h' }, process.env.JWT_TOKEN_SECRET);
                        res.json({
                            data: {
                                status: 201, //created
                                message: 'User Registered',
                                token: token
                            }
                        });
                    })
                });

                
            }else{
                res.status(403).json(
                    {
                        data: {
                            status: 403, //created
                            message: 'User Already Exists'
                        }
                    }
                );
            }
        })
        .catch( (error) => {
            console.log(error);
            res.json(error);
        });
}

const login = (req, res) => {
    UserSchema.findOne({email: req.body.email})
        .then( (existData) => {
            if(existData !== null){
                bcrypt.compare(req.body.password, existData.password, function(err, result){
                    if(result){
                        const token = jwt.sign({ email: existData.email, fullName: existData.fullName }, 'secret', { expiresIn: '24h' }, process.env.JWT_TOKEN_SECRET);
                        res.json({
                            data: {
                                status: 200, //created
                                message: 'User Logged!',
                                token: token
                            }
                        });
                    }else{
                        res.status(401).json({
                            data: {
                                status: 404,
                                message: "Password is incorrect!"
                            }
                        });
                    }
                });
            }else{
                res.status(404).json({
                    data: {
                        status: 404,
                        message: "Username not found!"
                    }
                });
            }
        } )
        .catch( (error) => {
            console.log(error);
        } );
}

const updateUser = (req, res) => {
    UserSchema.findOneAndUpdate({
        _id: req.headers.id
    },{
        $set: {
            email: req.body.email,
            password: req.body.password,
            fullName: req.body.fullName
        }
    })
        .then( () => {
            res.json({
                data: {
                    status: 201, //created
                    message: 'User Updated'
                }
            });
        })
        .catch( (error) => {
            console.log(error);
            res.json(error);
        });
}

const deleteUser = (req, res) => {
    UserSchema.findOneAndDelete({_id: req.headers.id})
        .then( () => {
            res.json({
                data: {
                    status: 201, //created
                    message: 'User Deleted'
                }
            });
        })
        .catch( (error) => {
            console.log(error);
            res.json(error);
        });
}

const getUser = (req, res) => {
    UserSchema.findOne({_id: req.headers.id})
        .then( (result) => {
            res.json({
                data: {
                    status: 201, //created
                    message: 'User Find'
                },
                value: result
            });
        })
        .catch( (error) => {
            console.log(error);
            res.json(error);
        });
}

const getAllUsers = (req, res) => {
    UserSchema.find()
        .then( (result) => {
            res.json({
                data: {
                    status: 201, //created
                    message: 'Users Find'
                },
                value: result
            });
        })
        .catch( (error) => {
            console.log(error);
            res.json(error);
        });
}

module.exports = {
    saveUser,
    login,
    updateUser,
    deleteUser,
    getAllUsers,
    getUser
}