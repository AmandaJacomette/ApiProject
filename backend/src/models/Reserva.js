const { Schema, model } = require('mongoose');

const ReservaSchema = new Schema({
    date: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    }
});

module.exports = model('Reserva', ReservaSchema);