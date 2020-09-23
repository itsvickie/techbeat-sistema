import usuario_model from '../models/usuario';
import sequelize from '../../config/sequelize';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

class SessionController{
    async login(req, res){
        const schema = Yup.object().shape({
            email: Yup.string().required(),
            senha: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json('Campos não preenchidos corretamente!');
        }

        const sql = `SELECT
                        * 
                    FROM
                        usuario us 
                    WHERE
                        us.email = '${req.body.email}' 
                    AND 
                        us.senha = '${req.body.senha}'
                    LIMIT 0, 1`;

        const usuario = await sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT,
            model: usuario_model
        });

        if(usuario == ''){
            return res.status(401).json({ error: 'E-mail e/ou senha incorretos!' });
        }

        const { id, nome, email } = usuario[0].dataValues;

        return res.json({ 
            usuario: {
                nome,
                email
            },
            token: jwt.sign({ id }, 'token')
        });
    }
}

export default new SessionController();