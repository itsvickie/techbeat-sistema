import request from 'supertest';
import app from '../../src/app';
import moment from 'moment';
import faker from 'faker';

describe('Vendas', () => {
    it('cadastrar novo produto', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/venda/1')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                data_compra: moment(new Date()).format('YYYY-MM-DD'),
                garantia: moment(new Date()).add('1', 'M').format('YYYY-MM-DD'),
                observacoes: faker.lorem.words(),
                testado: false,
                extra: faker.lorem.word(),
                local_venda: faker.lorem.words(),
                data_entrega: moment(new Date()).format('YYYY-MM-DD'),
                pagamento: true,
                entregue: true,
                produtos: [
                    {
                        id: 2,
                        quantidade: 3
                    }
                ]
            });
        
        expect(response.body).toHaveProperty('valor_total');
    });

    it('cadastrar produto sem data_compra', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/venda/1')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                garantia: moment(new Date()).add('1', 'M').format('YYYY-MM-DD'),
                observacoes: faker.lorem.words(),
                testado: false,
                extra: faker.lorem.word(),
                local_venda: faker.lorem.words(),
                data_entrega: moment(new Date()).format('YYYY-MM-DD'),
                pagamento: true,
                entregue: true,
                produtos: [
                    {
                        id: 2,
                        quantidade: 3
                    }
                ]
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });

    it('cadastrar produto sem garantia', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/venda/1')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                data_compra: moment(new Date()).format('YYYY-MM-DD'),
                observacoes: faker.lorem.words(),
                testado: false,
                extra: faker.lorem.word(),
                local_venda: faker.lorem.words(),
                data_entrega: moment(new Date()).format('YYYY-MM-DD'),
                pagamento: true,
                entregue: true,
                produtos: [
                    {
                        id: 2,
                        quantidade: 3
                    }
                ]
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });

    it('cadastrar produto sem observacoes', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/venda/1')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                data_compra: moment(new Date()).format('YYYY-MM-DD'),
                garantia: moment(new Date()).add('1', 'M').format('YYYY-MM-DD'),
                testado: false,
                extra: faker.lorem.word(),
                local_venda: faker.lorem.words(),
                data_entrega: moment(new Date()).format('YYYY-MM-DD'),
                pagamento: true,
                entregue: true,
                produtos: [
                    {
                        id: 2,
                        quantidade: 3
                    }
                ]
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });

    it('cadastrar produto sem testado', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/venda/1')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                data_compra: moment(new Date()).format('YYYY-MM-DD'),
                garantia: moment(new Date()).add('1', 'M').format('YYYY-MM-DD'),
                observacoes: faker.lorem.words(),
                extra: faker.lorem.word(),
                local_venda: faker.lorem.words(),
                data_entrega: moment(new Date()).format('YYYY-MM-DD'),
                pagamento: true,
                entregue: true,
                produtos: [
                    {
                        id: 2,
                        quantidade: 3
                    }
                ]
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });

    it('cadastrar produto sem extra', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/venda/1')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                data_compra: moment(new Date()).format('YYYY-MM-DD'),
                garantia: moment(new Date()).add('1', 'M').format('YYYY-MM-DD'),
                observacoes: faker.lorem.words(),
                testado: false,
                local_venda: faker.lorem.words(),
                data_entrega: moment(new Date()).format('YYYY-MM-DD'),
                pagamento: true,
                entregue: true,
                produtos: [
                    {
                        id: 2,
                        quantidade: 3
                    }
                ]
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });

    it('cadastrar produto sem local_venda', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/venda/1')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                data_compra: moment(new Date()).format('YYYY-MM-DD'),
                garantia: moment(new Date()).add('1', 'M').format('YYYY-MM-DD'),
                observacoes: faker.lorem.words(),
                testado: false,
                extra: faker.lorem.word(),
                data_entrega: moment(new Date()).format('YYYY-MM-DD'),
                pagamento: true,
                entregue: true,
                produtos: [
                    {
                        id: 2,
                        quantidade: 3
                    }
                ]
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });

    it('cadastrar produto sem data_entrega', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/venda/1')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                data_compra: moment(new Date()).format('YYYY-MM-DD'),
                garantia: moment(new Date()).add('1', 'M').format('YYYY-MM-DD'),
                observacoes: faker.lorem.words(),
                testado: false,
                extra: faker.lorem.word(),
                local_venda: faker.lorem.words(),
                pagamento: true,
                entregue: true,
                produtos: [
                    {
                        id: 2,
                        quantidade: 3
                    }
                ]
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });

    it('cadastrar produto sem pagamento', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/venda/1')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                data_compra: moment(new Date()).format('YYYY-MM-DD'),
                garantia: moment(new Date()).add('1', 'M').format('YYYY-MM-DD'),
                observacoes: faker.lorem.words(),
                testado: false,
                extra: faker.lorem.word(),
                local_venda: faker.lorem.words(),
                data_entrega: moment(new Date()).format('YYYY-MM-DD'),
                entregue: true,
                produtos: [
                    {
                        id: 2,
                        quantidade: 3
                    }
                ]
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });

    it('cadastrar produto sem entregue', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/venda/1')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                data_compra: moment(new Date()).format('YYYY-MM-DD'),
                garantia: moment(new Date()).add('1', 'M').format('YYYY-MM-DD'),
                observacoes: faker.lorem.words(),
                testado: false,
                extra: faker.lorem.word(),
                local_venda: faker.lorem.words(),
                data_entrega: moment(new Date()).format('YYYY-MM-DD'),
                pagamento: true,
                produtos: [
                    {
                        id: 2,
                        quantidade: 3
                    }
                ]
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });

    it('cadastrar produto sem produtos', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/venda/1')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                data_compra: moment(new Date()).format('YYYY-MM-DD'),
                garantia: moment(new Date()).add('1', 'M').format('YYYY-MM-DD'),
                observacoes: faker.lorem.words(),
                testado: false,
                extra: faker.lorem.word(),
                local_venda: faker.lorem.words(),
                data_entrega: moment(new Date()).format('YYYY-MM-DD'),
                pagamento: true,
                entregue: true
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });
});