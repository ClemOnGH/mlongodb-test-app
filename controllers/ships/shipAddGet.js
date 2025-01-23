module.exports = (req, res) => {
    try {
        res.render('layout', {
            title: 'Formulaire',
            css: null,
            body: [{ file: 'add-ship', data: null }],
        });
    } catch (e) {
        res.status(500).json({ message: e });
    }
};
