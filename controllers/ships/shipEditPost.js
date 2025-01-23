const shipEntry = require('mongoose').model('ships', require('../../models/ShipSchema.js'));

module.exports = async (req, res) => {
    const id = req.params.id;
    try {
        await shipEntry.findByIdAndUpdate(id, reorderEditForm(req.body));
        res.redirect('/ships');
    } catch (e) {
        res.status(500).json({ message: e });
    }
};

function reorderEditForm(d) {
    return {
        name: d.name,
        manufacturer: d.manufacturer,
        description: d.description,
        size: d.size,
        seats: d.seats,
        cost: d.cost,
        image: d.image,
        stats: {
            speed: d.speed,
            boost_speed: d.speed,
            agility: d.agility,
            base_shield: d.base_shield,
            base_armour: d.base_armour,
            mass: d.mass,
        },
    };
}
