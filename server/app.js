const express = require('express');
const cors = require('cors');
require('dotenv/config');
const dbConnect = require('./database');

const app = express();

const PORT = process.env.PORT || 8080;

//Route Imports
const usersRoute = require('./routes/users');
const restaurantsRoute = require('./routes/restaurants');

//Middleware
app.use(express.json());
app.use(cors());

app.use('/users', usersRoute);
app.use('/restaurants', restaurantsRoute);

//CONNECT TO DB
dbConnect();

//listen
app.listen(PORT, () => console.log('Server Started on port: ' + PORT));
