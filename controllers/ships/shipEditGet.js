const shipEntry = require('mongoose').model('ships', require('../../models/ShipSchema.js'));

module.exports = async (req, res) => {
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
        res.status(500).json({ message: e });
    }
};
