const Reserva = require('../models/Reserva');
const House = require('../models/House');
const User = require('../models/User');

class ReservaController {

    async index(req, res) {
        const { user_id } = req.headers;

        const reserva = await Reserva.find({ user: user_id }).populate('house');

        return res.json(reserva);
    }

    async store(req, res) {
        const { house_id } = req.params;
        const { date } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const house = await House.findById(house_id);

        if (!house) {
            return res.status(400).json({ error: 'Essa casa n�o existe' });
        }
        if (house.status !== true) {
            return res.status(400).json({ error: 'Essa casa n�o est� dispon�vel' });
        }
        if (String(user._id) === String(house.user)) {
            return res.status(401).json({ error: 'N�o autorizado' });

        }

        const reserva = await Reserva.create({
            user: user_id,
            house: house_id,
            date: date,
        });

        await reserva.populate('house').populate('user').execPopulate();

        return res.json(reserva);
    }

    async destroy(req, res) {
        const { reserva_id } = req.body;

        await Reserva.findByIdAndDelete({ _id: reserva_id });

        return res.send();
    }
}

module.exports = new ReservaController();