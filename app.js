console.clear();

const chalk = require('chalk'); // I only use this package to colorize console outputs.
const connectDB = require('./database/db_connection.js');
const shipRoutes = require('./routing/ships.js');
const userRoutes = require('./routing/users.js');
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3005 || process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/ships', shipRoutes);
app.use('/users', userRoutes);

app.listen(port, (e) => {
    if (e) console.log(chalk.red(e));
    console.log(chalk.blue(`Listening to: http://localhost:${port}/`));
    connectDB();
});
