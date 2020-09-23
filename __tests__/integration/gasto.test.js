import request from 'supertest';
import app from '../../src/app';
import faker from 'faker';

describe('Gasto', () => {
    it('cadastro novo gasto', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/gastos')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                descricao: faker.lorem.words(),
                valor: faker.commerce.price()
            });

        expect(response.body).toEqual({
            "message": "Gasto cadastrado com sucesso!"
        });
    });

    it('cadastro gasto sem descricao', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/gastos')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                valor: faker.commerce.price()
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });

    it('cadastro gasto sem valor', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/gastos')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                descricao: faker.lorem.words()
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });
});