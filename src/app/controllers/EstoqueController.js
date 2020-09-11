import estoque_model from '../models/estoque';
import sequelize from '../../config/sequelize';
import * as Yup from 'yup';

class EstoqueController{
    async update(req, res){
        const schema = Yup.object().shape({
            quantidade: Yup.number().integer().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json('Campos não preenchidos corretamente!');
        }

        const sql = `UPDATE 
                        estoque e
                     SET 
                        e.quantidade = ${req.body.quantidade} 
                     WHERE
                        e.produtoID = ${req.params.id}`;

        await sequelize.query(sql, {
            type: sequelize.QueryTypes.UPDATE,
            model: estoque_model
        }).then(resp => {
            return res.json({ message: 'Estoque atualizado com sucesso!' })
        }).catch(err => {
            return res.status(400).json({ error: 'Ocorreu um erro ao atualizar o estoque!' });
        });
    }
}

export default new EstoqueController();