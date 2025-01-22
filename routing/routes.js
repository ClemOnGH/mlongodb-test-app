const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const router = express.Router();

const ShipSchema = require('../models/ShipSchema.js');
const shipEntry = mongoose.model('ships', ShipSchema);

router.get('/', async (req, res) => {
    try {
        res.render('layout', {
            title: 'Ship library',
            css: '/ship-list.css',
            body: [{ file: 'ship-list', data: await shipEntry.find() }],
        });
    } catch (e) {
        if (e) chalk.red(e);
    }
});

router.get('/info/:id', async (req, res) => {
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

router
    .get('/add', (req, res) => {
        try {
            res.render('layout', {
                title: 'Formulaire',
                css: null,
                body: [{ file: 'add-ship', data: null }],
            });
        } catch (e) {
            console.log(chalk.red(e));
        }
    })
    .post('/add', async (req, res) => {
        console.log(req.body);
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

router.get('/remove/:id', async (req, res) => {
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

router
    .get('/edit/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const data = await shipEntry.findById(id);
            res.render('layout', {
                title: 'Modification de ' + id,
                css: '/edit-ship.css',
                body: [
                    { file: 'edit-ship', data: data },
                    { file: 'form-checkbox', data: null },
                ],
            });
        } catch (e) {
            console.log(chalk.red(e));
            res.status(500).json({ message: e });
        }
    })
    .patch('/edit/:id', (req, res) => {
        try {
            console.log(req.body);
            res.redirect('/ships');
        } catch (e) {
            console.error(chalk.red(e));
        }
    });

module.exports = router;
