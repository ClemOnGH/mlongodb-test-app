const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();

function connectDB() {
    try {
        mongoose.connect(process.env.DB_URI + process.env.DB_DIR);
        console.log(chalk.yellow('Succesfully connected to MongoDB using mongoose'));
    } catch (e) {
        if (e) console.log(chalk.red(e));
    }
}

module.exports = connectDB;
