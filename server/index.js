//import dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//import routes
const CustomerRoutes = require('./routes/CustomerRoute');
const UserRoutes = require('./routes/UserRoutes');

//initialize express app
const app = express();

//port
const port = process.env.SERVER_PORT;

//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//url paths
app.use('/api/v1/customer', CustomerRoutes);
app.use('/api/v1/user', UserRoutes);

//connect database
mongoose.set('strictQuery', false); //for deprication warning
mongoose.connect('mongodb+srv://jeral:mnjs0529@angularproject.s8xodb2.mongodb.net/?retryWrites=true&w=majority')
    .then( () => {
        console.log('Database Connected Successfully');
    })
    .catch( (error) => {
        console.log(error);
    } );

//start server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
