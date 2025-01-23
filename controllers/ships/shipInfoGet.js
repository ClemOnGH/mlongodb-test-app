const shipEntry = require('mongoose').model('ships', require('../../models/ShipSchema.js'));

module.exports = async (req, res) => {
    const id = req.params.id;
    try {
        res.render('layout', {
            title: 'Ship list',
            css: null,
            body: [{ file: 'ship-list', data: await shipEntry.findById(id) }],
        });
    } catch (e) {
        res.status(500).json({ message: 'Content could not be found.' });
    }
};
