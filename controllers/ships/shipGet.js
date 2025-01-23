const shipEntry = require('mongoose').model('ships', require('../../models/ShipSchema.js'));

module.exports = async (req, res) => {
    try {
        res.render('layout', {
            title: 'Ship library',
            css: '/ship-list.css',
            body: [{ file: 'ship-list', data: await shipEntry.find() }],
        });
    } catch (e) {
        res.status(500).json({ message: e });
    }
};
