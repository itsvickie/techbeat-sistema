import request from 'supertest';
import app from '../../src/app';
import faker from 'faker';

describe('Cliente', () => {
    it('cadastrar novo cliente', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/cliente')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                telefone: 819 + Math.floor(Math.random() * 111111111),
                instagram: '@' + faker.lorem.word(),
                cpf: Math.floor(Math.random() * 111111111111)
            });

        expect(response.body).toEqual({
            "message": "Cliente cadastrado com sucesso!"
        });
    });

    it('cadastrar cliente cpf repetido', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/cliente')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                telefone: 81911111111,
                instagram: '@' + faker.lorem.word(),
                cpf: 11111111111
            });

        expect(response.body).toEqual({
            "error": "Cliente já cadastrado na base de dados!"
        });
    });

    it('cadastrar cliente sem nome', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/cliente')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                telefone: 819 + Math.floor(Math.random() * 111111111),
                instagram: '@' + faker.lorem.word(),
                cpf: Math.floor(Math.random() * 111111111111)
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });

    it('cadastrar cliente sem telefone', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/cliente')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                instagram: '@' + faker.lorem.word(),
                cpf: Math.floor(Math.random() * 111111111111)
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });

    it('cadastrar cliente sem instagram', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/cliente')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                telefone: 819 + Math.floor(Math.random() * 111111111),
                cpf: Math.floor(Math.random() * 111111111111)
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });

    it('cadastrar cliente sem cpf', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/cliente')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                telefone: 819 + Math.floor(Math.random() * 111111111),
                instagram: '@' + faker.lorem.word()
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });
});