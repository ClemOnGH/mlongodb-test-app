const shipEntry = require('mongoose').model('ships', require('../../models/ShipSchema.js'));

module.exports = async (req, res) => {
    const id = req.params.id;
    try {
        await shipEntry.findByIdAndDelete(id);
        res.status(200).redirect('/ships');
    } catch (e) {
        res.status(500).json({ message: e });
    }
};
