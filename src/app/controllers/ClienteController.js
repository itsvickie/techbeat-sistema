import cliente_model from '../models/cliente';
import sequelize from '../../config/sequelize';
import * as Yup from 'yup';

class ClienteController{
    async create(req, res){
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            telefone: Yup.number().integer().required(),
            instagram: Yup.string().required(),
            cpf: Yup.number().integer().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json('Campos não preenchidos corretamente!');
        }

        const sql_verif = `SELECT
                                * 
                            FROM
                                cliente 
                            WHERE
                                cpf = '${req.body.cpf}' 
                            OR 
                                telefone = '${req.body.telefone}' 
                            OR 
                                instagram = '${req.body.instagram}'`;

        const verif_cli = await sequelize.query(sql_verif, {
            type: sequelize.QueryTypes.SELECT
        });
        
        if(verif_cli != ''){
            return res.status(400).json({ error: 'Cliente já cadastrado na base de dados!' });
        }

        const sql = `INSERT INTO 
                        cliente ( nome, telefone, instagram, cpf )
                     VALUES
                        ('${req.body.nome}', ${req.body.telefone}, '${req.body.instagram}', ${req.body.cpf})`;

        await sequelize.query(sql, {
            type: sequelize.QueryTypes.INSERT,
            model: cliente_model
        }).then(resp => {
            return res.json({ message: 'Cliente cadastrado com sucesso!' })
        }).catch(err => {
            return res.status(400).json({ error: 'Ocorreu um erro ao cadastrar o cliente!' })
        });
    }
}

export default new ClienteController();