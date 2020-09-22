import request from 'supertest';
import app from '../../src/app';

describe('Session', () => {
    it('retorno token jwt apos login com dados validos', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });
        
        expect(response.body).toHaveProperty('token');
    });

    it('fazer login com inexistente', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida@gmail.com',
	            senha: 'Dexaqeto1@'
            });
        
        expect(response.status).toBe(401);
    });

    it('fazer login com senha incorreta', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto'
            });

        expect(response.status).toBe(401);
    });

    it('token invalido', async () => {
        const response = await request(app)
            .post('/produto')
            .set('Authorization', `Bearer 123`)
            .send({
                nome: 'teste',
                tipo: 'teste',
                marca: 'teste',
                descricao: 'teste',
                valor_pago: 30,
                preco_base: 20,
                quantidade: 10
            });
        
            expect(response.body).toEqual('Token inválido!');
    });

    it('token não informado', async () => {
        const response = await request(app)
            .post('/produto')
            .send({
                nome: 'teste',
                tipo: 'teste',
                marca: 'teste',
                descricao: 'teste',
                valor_pago: 30,
                preco_base: 20,
                quantidade: 10
            });
        
            expect(response.body).toEqual('Token não informado!');
    });
});