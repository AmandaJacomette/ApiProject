const User = require('../models/User');
const Yup = require('yup');

class SessionController {

    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        });

        const { email } = req.body;

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação' });
        }

        let user = await User.findOne({ email });//verifica se user existe

        if (!user) {//se nao cria
            user = await User.create({ email });
        }

        return res.json(user);
    }

}
/*Metodos que pode ter:
 * index: listagem de sessoes
 * show: listar uma unica sessao
 * update: alterar algo
 * store: criar uma sessao
 * destroy: deletar uma sessao
*/
module.exports = new SessionController();