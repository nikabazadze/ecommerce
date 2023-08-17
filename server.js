/**
 * Package Imports
 */
const express = require('express');
const app = express();
require("dotenv").config();
const morgan = require('morgan');
const bodyParser = require('body-parser');

/**
 * Router Imports
 */
const usersRouter = require('./routes/userRoutes');


const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/users', usersRouter);



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
