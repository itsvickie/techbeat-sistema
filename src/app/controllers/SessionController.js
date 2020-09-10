import usuario_model from '../models/usuario';
import sequelize from '../../config/sequelize';
import jwt from 'jsonwebtoken';

class SessionController{
    async login(req, res){
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
            model: usuario_model
        });

        if(usuario == ''){
            return res.status(401).json({ error: 'E-mail e/ou senha incorretos!' });
        }

        const userStringify = JSON.stringify(usuario);

        const userParse = JSON.parse(userStringify);

        const { id, nome, email } = userParse[0];

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