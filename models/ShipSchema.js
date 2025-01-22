const mongoose = require('mongoose');

const ShipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: String,
    size: String,
    seats: Number,
    cost: Number,
    stats: {
        speed: Number,
        boost_speed: Number,
        agility: Number,
        base_shield: Number,
        base_armour: Number,
        mass: Number,
    },
    image: String,
    use: Array,
});

module.exports = ShipSchema;
