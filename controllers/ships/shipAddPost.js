const shipEntry = require('mongoose').model('ships', require('../../models/ShipSchema.js'));

module.exports = async (req, res) => {
    try {
        const newShip = await shipEntry(req.body);
        newShip.save();
        res.status(200).redirect('/ships');
    } catch (e) {
        res.status(500).json({ message: 'Failed to treat information.' });
    }
};
