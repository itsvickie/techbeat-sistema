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
            valor_total: Yup.number().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json('Campos não preenchidos corretamente!')
        }

        const sql = `INSERT INTO 
                        venda ( data_compra, garantia, observacoes, testado, extra, local_venda, data_entrega, pagamento, entregue, valor_total, usuarioID, clienteID )
                     VALUES
                        ( '${req.body.data_compra}', '${req.body.garantia}', '${req.body.observacoes}', ${req.body.testado}, '${req.body.extra}', '${req.body.local_venda}', '${req.body.data_entrega}', ${req.body.pagamento}, ${req.body.entregue}, ${req.body.valor_total}, 1, 3 `
    }
}

export default new VendaController();