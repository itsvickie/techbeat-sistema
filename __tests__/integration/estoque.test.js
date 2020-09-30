import request from 'supertest';
import app from '../../src/app';

describe('Estoque', () => {
    it('atualizar estoque', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .put('/estoque/2')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                quantidade: 10
            });

        expect(response.body).toEqual({
            "message": "Estoque atualizado com sucesso!"
        });
    });

    it('atualizar estoque produto inexistente', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .put('/estoque/999999999')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                quantidade: 10
            });

        expect(response.body).toEqual({
            "error": "Produto não encontrado na base de dados!"
        });
    });

    it('atualizar estoque sem quantidade', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .put('/estoque/2')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
            });

        expect(response.body).toEqual('Campos não preenchidos corretamente!');
    });
});