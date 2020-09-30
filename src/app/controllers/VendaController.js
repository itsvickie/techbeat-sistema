import produto_venda from '../models/venda';
import sequelize from '../../config/sequelize';
import * as Yup from 'yup';

class VendaController{
    async create(req, res){
        const schema = Yup.object().shape({
            data_compra: Yup.date().required(),
            garantia: Yup.date().required(),
            observacoes: Yup.string().required(),
            testado: Yup.boolean().required(),
            extra: Yup.string().required(),
            local_venda: Yup.string().required(),
            data_entrega: Yup.date().required(),
            pagamento: Yup.boolean().required(),
            entregue: Yup.boolean().required(),
            produtos: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json('Campos não preenchidos corretamente!');
        }

        var sql_verif = '';
        var preco_base = '';
        var valor_total = 0;
        var produtos = '';

        for(var i = 0; i < ((req.body.produtos).length); i++){
            sql_verif = `SELECT
                            pr.preco_base,
                            pr.inatividade,
                            es.quantidade
                         FROM
                            produto pr
                         INNER JOIN estoque es ON
                            es.produtoID = pr.id
                         WHERE
                            pr.id = ${req.body.produtos[i].id}`;

            preco_base = await sequelize.query(sql_verif, {
                type: sequelize.QueryTypes.SELECT
            });

            if(preco_base[0].inatividade == 0 || preco_base[0].quantidade <= 0){
                return res.status(400).json({ error: `O produto ${req.body.produtos[i].id} está inativo e/ou sem estoque!` });
            } 

            const valor_unitario = (preco_base[0].preco_base);
            const quantidade = (req.body.produtos[i].quantidade);

            valor_total += valor_unitario * quantidade;
            produtos += req.body.produtos[i].id;
        }

        const sql = `INSERT INTO 
                        venda ( data_compra, garantia, observacoes, testado, extra, local_venda, data_entrega, pagamento, entregue, valor_total, usuarioID, clienteID )
                     VALUES
                        ( '${req.body.data_compra}', '${req.body.garantia}', '${req.body.observacoes}', ${req.body.testado}, '${req.body.extra}', '${req.body.local_venda}', '${req.body.data_entrega}', ${req.body.pagamento}, ${req.body.entregue}, ${valor_total}, ${req.usuarioID}, ${req.params.clienteID} )`;

        await sequelize.query(sql, {
            type: sequelize.QueryTypes.INSERT,
            model: produto_venda
        }).then(async resp => {
            const [id, ] = resp;

            for(var i = 0; i < produtos.length; i++){
                const sql = `INSERT INTO
                                produto_venda ( vendaID, produtoID )
                              VALUES
                                ( ${id}, ${produtos[i]})`;
                
                await sequelize.query(sql, {
                    type: sequelize.QueryTypes.INSERT
                });
            }

            return res.json({
                cliente: `${req.params.clienteID}`,
                valor_total: `${valor_total}`
            });
        }).catch(err => {
            return res.status(400).json({ error: 'Não foi possível realizar a compra!' });
        });
    }
}

export default new VendaController();