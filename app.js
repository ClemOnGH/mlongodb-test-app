// console.clear();

const chalk = require('chalk'); // I only use this package to colorize console outputs.
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const multer = require('multer');
const shipRoutes = require('./routing/routes.js');
require('dotenv').config();

const app = express();
const port = 3005 || process.env.PORT;
const upload = multer();
app.use(upload.any());

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.DB_URI + process.env.DB_DIR).then(() => {
    try {
        console.log(chalk.yellow('Succesfully connected to MongoDB using mongoose'));
    } catch (e) {
        if (e) console.log(chalk.red(e));
    }
});

app.use('/ships', shipRoutes);

app.listen(port, (e) => {
    if (e) console.log(chalk.red(e));
    console.log(chalk.blue(`Listening to: http://localhost:${port}/`));
});
