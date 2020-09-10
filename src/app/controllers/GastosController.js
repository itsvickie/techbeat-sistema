import gastos_model from '../models/gastos';
import sequelize from '../../config/sequelize';
import * as Yup from 'yup';

class GastosController{
    async create(req, res){
        const schema = Yup.object().shape({
            descricao: Yup.string().required(),
            valor: Yup.number().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json('Campos não preenchidos corretamente!');
        }

        const sql = `INSERT INTO 
                        gastos ( descricao, valor )
                     VALUES
                        ('${req.body.descricao}', ${req.body.valor})`;

        await sequelize.query(sql, {
            type: sequelize.QueryTypes.INSERT,
            model: gastos_model
        }).then(resp => {
            return res.json({ message: 'Gasto cadastrado com sucesso!' })
        }).catch(err => {
            return res.status(400).json({ error: 'Ocorreu um erro ao cadastrar o gasto! ' })
        });
    }
}

export default new GastosController();