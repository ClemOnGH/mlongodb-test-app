module.exports = (req, res) => {
    try {
        res.render('layout', {
            title: 'Inscription',
            css: [{ file: '/user-register.css' }],
            body: [{ file: 'user-register', data: null }],
        });
    } catch (e) {
        res.status(500).json({ message: e });
    }
};
