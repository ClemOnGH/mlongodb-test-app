console.clear();

const ansi = require('ansi'); // I only use this package to colorize console outputs.
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
require('dotenv').config();

const cursor = ansi(process.stdout);
const app = express();
const port = 3005 || process.env.PORT;

mongoose.connect(process.env.DB_URI + process.env.DB_DIR).then(() => {
    try {
        cursor.blue().write('Succesfully connected to MongoDB using mongoose\n').reset();
    } catch (e) {
        if (e)
            cursor
                .red()
                .write(e + '\n')
                .reset();
    }
});

const ShipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: String,
    size: String,
    seats: Number,
    cost: Number,
    stats: {
        speed: Number,
        boost_speed: Number,
        agility: Number,
        base_shield: Number,
        base_armour: Number,
        mass: Number,
    },
});

const shipEntry = mongoose.model('Ship', ShipSchema);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Welcome to the hub!');
});

app.get('/ships', (req, res) => {});

app.get('/test', (req, res) => {
    res.render('layout', { title: null });
});

app.listen(port, (e) => {
    if (e) {
        console.error(e);
        cursor
            .red()
            .write(e + '\n')
            .reset();
    }
    cursor.green().write(`Listening to: http://localhost:${port}/\n`).reset();
});
