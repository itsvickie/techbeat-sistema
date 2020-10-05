import produto_model from '../models/produto';
import estoque_model from '../models/estoque';
import sequelize from '../../config/sequelize';
import * as Yup from 'yup';

class ProdutoController {
    async create(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            tipo: Yup.string().required(),
            marca: Yup.string().required(),
            descricao: Yup.string().required(),
            valor_pago: Yup.number().required(),
            preco_base: Yup.number().required(),
            quantidade: Yup.number().integer().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json('Campos não preenchidos corretamente!')
        };

        const sql_verif = `SELECT
                                * 
                            FROM
                                produto 
                            WHERE
                                nome = '${req.body.nome}' 
                                AND tipo = '${req.body.tipo}' 
                                AND marca = '${req.body.marca}'`;
        
        const verif_produto = await sequelize.query(sql_verif, {
            type: sequelize.QueryTypes.SELECT,
            model: produto_model
        });

        if(verif_produto != ''){
            return res.status(400).json({ error: 'Produto já cadastrado na base de dados!' });
        }

        const sql = `INSERT INTO
                        produto ( nome, tipo, marca, descricao, valor_pago, preco_base )
                     VALUES
                        ( '${req.body.nome}', '${req.body.tipo}', '${req.body.marca}', '${req.body.descricao}', ${req.body.valor_pago}, ${req.body.preco_base} )`;

        await sequelize.query(sql, {
            type: sequelize.QueryTypes.INSERT,
            model: produto_model
        }).then(async resp => {
            const [id,] = resp;

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

    async update(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string(),
            tipo: Yup.string(),
            marca: Yup.string(),
            descricao: Yup.string(),
            valor_pago: Yup.number(),
            preco_base: Yup.number(),
            inatividade: Yup.boolean()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json('Campos não preenchidos corretamente!');
        }

        const sql_verif = `SELECT
                                inatividade 
                            FROM
                                produto 
                            WHERE
                                id = ${req.params.id}`;

        const verif_id = await sequelize.query(sql_verif, {
            type: sequelize.QueryTypes.SELECT
        });

        if (verif_id == '') {
            return res.status(400).json({ error: 'Produto não encontrado na base de dados!' });
        }

        if(req.body.inatividade){
            const sql = `UPDATE produto
                         SET inatividade = ${req.body.inatividade}
                         WHERE 
                            id = ${req.params.id}`;
            
            const sql2 = `UPDATE estoque
                          SET quantidade = 0
                          WHERE 
                            id = ${req.params.id}`;

            await sequelize.query(sql, {
                type: sequelize.QueryTypes.UPDATE
            }).then(async resp => {
                if(req.body.inatividade == false){
                    await sequelize.query(sql2, {
                        type: sequelize.QueryTypes.UPDATE
                    });

                    return res.json({ message: 'Produto desativado!' });
                }
                return res.json({ message: 'Produto ativado!' });
            }).catch(err => {
                return res.status(400).json({ error: 'Não foi possível desativar o produto!' });
            });
        }

        if(verif_id[0].inatividade == 0 && req.body.inatividade == 0){
            return res.status(400).json({ error: 'Produto já desativado na base de dados!' });
        }

        if(verif_id[0].inatividade == 1 && req.body.inatividade == 1){
            return res.status(400).json({ error: 'Produto já ativado na base de dados!' });
        }

        function updateQuery(){
            let sql_mont = `UPDATE produto p SET `;

            if(req.body.nome){
                sql_mont += `p.nome = '${req.body.nome}',`;
            }

            if(req.body.tipo){
                sql_mont += `p.tipo = '${req.body.tipo}',`;
            }

            if(req.body.marca){
                sql_mont += `p.marca = '${req.body.marca}',`;
            }

            if(req.body.descricao){
                sql_mont += `p.descricao = '${req.body.descricao}',`;
            }

            if(req.body.valor_pago){
                sql_mont += `p.valor_pago = ${req.body.valor_pago},`;
            }

            if(req.body.preco_base){
                sql_mont += `p.preco_base = ${req.body.preco_base},`;
            }

            let sql_update = sql_mont.substr(0, (sql_mont.length - 1));

            sql_update += ` WHERE id = ${req.params.id}`;

            return sql_update;
        }

        await sequelize.query(updateQuery(), {
            type: sequelize.QueryTypes.UPDATE,
            model: produto_model
        }).then(resp => {
            return res.json({ message: 'Produto atualizado com sucesso!' });
        }).catch(err => {
            return res.status(400).json({ error: 'Ocorreu um erro ao atualizar o produto!' });
        });
    }

    async deactivate(req, res) {
        const schema = Yup.object().shape({
            inatividade: Yup.boolean().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Código de Inatividade não informado!' });
            // False -> Desativar | True -> Ativar
        }

        const sql_verif = `SELECT
                            inatividade 
                           FROM
                            produto 
                           WHERE
                            id = ${req.params.id}`;

        const verif_id = await sequelize.query(sql_verif, {
            type: sequelize.QueryTypes.SELECT
        });

        if (verif_id == '') {
            return res.status(400).json({ error: 'Produto não encontrado na base de dados!' });
        }

        if(verif_id[0].inatividade == 0 && req.body.inatividade == 0){
            return res.status(400).json({ error: 'Produto já desativado na base de dados!' });
        }

        if(verif_id[0].inatividade == 1 && req.body.inatividade == 1){
            return res.status(400).json({ error: 'Produto já ativado na base de dados!' });
        }

        const sql = `UPDATE produto 
                     SET inatividade = ${req.body.inatividade}
                     WHERE
                         id = ${req.params.id}`;

        const sql2 = `UPDATE estoque
                      SET quantidade = 0
                      WHERE 
                         id = ${req.params.id}`;

        await sequelize.query(sql, {
            type: sequelize.QueryTypes.UPDATE
        }).then(async resp => {
            if(req.body.inatividade == false){
                await sequelize.query(sql2, {
                    type: sequelize.QueryTypes.UPDATE
                });
                return res.json({ message: 'Produto desativado!' });
            }
            return res.json({ message: 'Produto ativado!' });
        }).catch(err => {
            return res.status(400).json({ error: 'Não foi possível desativar o produto!' })
        })
    }

    async list(req, res){
        let sql = `SELECT 
                        id,
                        nome, 
                        tipo, 
                        marca, 
                        descricao, 
                        preco_base 
                    FROM 
                        produto 
                    WHERE 
                        inatividade <> 0`;

        if(req.body.nome){
            sql += ` AND nome LIKE '%${req.body.nome}%'`;
        }

        if(req.body.preco_base){
            sql += ` AND preco_base LIKE '${req.body.preco_base}.%'`;
        }

        if(req.body.tipo){
            sql += ` AND tipo LIKE '%${req.body.tipo}%'`;
        }

        if(req.body.marca){
            sql += ` AND marca LIKE '%${req.body.marca}%'`;
        }

        await sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        }).then(resp => {
            return res.json(resp);
        }).catch(err => {
            return res.status(400);
        });
    }
}

export default new ProdutoController();