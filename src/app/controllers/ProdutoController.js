import produto_model from '../models/produto';
import estoque_model from '../models/estoque';
import sequelize from '../../config/sequelize';
// import Yup from 'yup';
import * as Yup from 'yup';

class ProdutoController{
    async create(req, res){
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            tipo: Yup.string().required(),
            marca: Yup.string().required(),
            descricao: Yup.string().required(),
            valor_pago: Yup.number().required(),
            preco_base: Yup.number().required()
        });
    
        if(!(await schema.isValid(req.body))){
            return res.status(400).json('Campos não preenchidos corretamente!')
        };

        const sql = `INSERT INTO
                        produto ( nome, tipo, marca, descricao, valor_pago, preco_base )
                     VALUES
                        ( '${req.body.nome}', '${req.body.tipo}', '${req.body.marca}', '${req.body.descricao}', ${req.body.valor_pago}, ${req.body.preco_base} )`;

        await sequelize.query(sql, {
            type: sequelize.QueryTypes.INSERT,
            model: produto_model
        }).then(async resp => {
            const [id, ] = resp;

            const sql_estoque = `INSERT INTO 
                                    estoque ( produtoID, quantidade )
                                 VALUES
                                    ( ${id}, ${req.body.quantidade} )`;

            await sequelize.query(sql_estoque, {
                type: sequelize.QueryTypes.INSERT,
                model: estoque_model
            }).then(resp => {
                return res.json({ message: 'Produto cadastrado com sucesso!' })
            }).catch(err => {   
                return res.status(400).json({ error: 'Ocorreu um erro ao cadastrar o produto!' })
            });
        }).catch(err => {
            return res.status(400).json({ error: 'Ocorreu um erro ao cadastrar o produto!' })
        });
    }

    async update(req, res){
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            tipo: Yup.string().required(),
            marca: Yup.string().required(),
            descricao: Yup.string().required(),
            valor_pago: Yup.number().required(),
            preco_base: Yup.number().required()
        });
    
        if(!(await schema.isValid(req.body))){
            return res.status(400).json('Campos não preenchidos corretamente!')
        }

        const sql_verif = `SELECT
                                * 
                            FROM
                                produto 
                            WHERE
                                id = ${req.params.id}`;
        
        const verif_id = await sequelize.query(sql_verif, {
            type: sequelize.QueryTypes.SELECT,
            model: produto_model
        });

        if(verif_id == ''){
            return res.status(400).json({ error: 'Produto não encontrado na base de dados!' })
        }

        const sql_update = `UPDATE produto p
                            SET
                                p.nome = '${req.body.nome}', 
                                p.tipo = '${req.body.tipo}',
                                p.marca = '${req.body.marca}',
                                p.descricao = '${req.body.descricao}',
                                p.valor_pago = ${req.body.valor_pago},
                                p.preco_base = ${req.body.preco_base}
                            WHERE
                                id = ${req.params.id}`;

        await sequelize.query(sql_update, {
            type: sequelize.QueryTypes.UPDATE,
            model: produto_model
        }).then(resp => {
            return res.json({ message: 'Produto atualizado com sucesso!' })
        }).catch(err => {
            return res.status(400).json({ error: 'Ocorreu um erro ao atualizar o produto!' })
        });
    }
}

export default new ProdutoController();