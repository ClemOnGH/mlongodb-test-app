const express = require('express');
const router = express.Router();

const { shipAddGet, shipAddPost, shipGet, shipInfoGet, shipEditGet, shipEditPost, shipRemoveGet } = require('../controllers/functions.js');

router.get('/', shipGet);
router.get('/info/:id', shipInfoGet);
router.get('/add', shipAddGet).post('/add', shipAddPost);
router.get('/remove/:id', shipRemoveGet);
router.get('/edit/:id', shipEditGet).post('/edit/:id', shipEditPost);

module.exports = router;
