// console.clear();

const chalk = require('chalk'); // I only use this package to colorize console outputs.
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const multer = require('multer');
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
    image: String,
    use: Array,
});

const shipEntry = mongoose.model('ships', ShipSchema);

app.get('/ships', async (req, res) => {
    try {
        res.render('layout', {
            title: 'Ship library',
            css: './ship-list.css',
            body: [{ file: 'ship-list', data: await shipEntry.find() }],
        });
    } catch (e) {
        if (e) red(e);
    }
});

app.get('/ships/:id', async (req, res) => {
    const id = req.params.id;
    try {
        console.log(chalk.yellow(`Attempting to display ship-list.ejs with data`));
        res.render('layout', {
            title: 'Ship list',
            css: null,
            body: [{ file: 'ship-list', data: await shipEntry.findById(id) }],
        });
    } catch (e) {
        if (e) console.log(chalk.red(e));
        res.status(500).json({ message: 'Content could not be found.' });
    }
});

app.get('/add-ship', (req, res) => {
    try {
        res.render('layout', {
            title: 'Formulaire',
            css: null,
            body: [{ file: 'add-ship', data: null }],
        });
    } catch (e) {
        console.log(chalk.red(e));
    }
});

app.post('/add-ship', async (req, res) => {
    try {
        const newShip = await shipEntry(req.body);
        newShip.save();
        console.log(chalk.green(`Succesfully saved entry with ObjectId: ${newShip._id} !\nRedirecting to /ships`));
        res.status(200).redirect('/ships');
    } catch (e) {
        if (e) console.log(chalk.red(e));
        res.status(500).json({ message: 'Failed to treat information.' });
    }
});

app.get('/remove-ship/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await shipEntry.findByIdAndDelete(id);
        console.log(chalk.red(`Suppression de l'objet ${id} effectuée avec succès.`));
        res.status(200).redirect('/ships');
    } catch (e) {
        console.log(chalk.red(e));
        res.status(500).json({ message: e });
    }
});

app.get('/edit-ship/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await shipEntry.findById(id);
        res.render('layout', {
            title: 'Modification de ' + id,
            css: '../edit-ship.css',
            body: [
                { file: 'edit-ship', data: data },
                { file: 'form-checkbox', data: null },
            ],
        });
    } catch (e) {
        console.log(chalk.red(e));
        res.status(500).json({ message: e });
    }
});

app.patch('');

app.listen(port, (e) => {
    if (e) console.log(chalk.red(e));
    console.log(chalk.blue(`Listening to: http://localhost:${port}/`));
});
