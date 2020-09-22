import request from 'supertest';
import app from '../../src/app';
import faker from 'faker';

describe('Produto', () => {
    it('cadastro de produto', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/produto')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                tipo: faker.commerce.productName(),
                marca: faker.lorem.word(),
                descricao: faker.lorem.words(),
                valor_pago: faker.commerce.price(),
                preco_base: 20,
                quantidade: 10
            });

        expect(response.body).toEqual({
            "message": "Produto cadastrado com sucesso!"
        });
    });

    it('cadastro produto sem nome', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        const response = await request(app)
            .post('/produto')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                tipo: faker.commerce.productName(),
                marca: faker.lorem.word(),
                descricao: faker.lorem.words(),
                valor_pago: faker.commerce.price(),
                preco_base: 20,
                quantidade: 10
            });

        expect(response.body).toEqual("Campos não preenchidos corretamente!");
    });

    it('cadastro produto sem tipo', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        const response = await request(app)
            .post('/produto')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                marca: faker.lorem.word(),
                descricao: faker.lorem.words(),
                valor_pago: faker.commerce.price(),
                preco_base: 20,
                quantidade: 10
            });
        
        expect(response.body).toEqual("Campos não preenchidos corretamente!");
    });

    it('cadastro produto sem marca', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        const response = await request(app)
            .post('/produto')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                tipo: faker.commerce.productName(),
                descricao: faker.lorem.words(),
                valor_pago: faker.commerce.price(),
                preco_base: 20,
                quantidade: 10
            });
        
        expect(response.body).toEqual("Campos não preenchidos corretamente!");
    });

    it('cadastro produto sem descricao', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        const response = await request(app)
            .post('/produto')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                tipo: faker.commerce.productName(),
                marca: faker.lorem.word(),
                valor_pago: faker.commerce.price(),
                preco_base: 20,
                quantidade: 10
            });

        expect(response.body).toEqual("Campos não preenchidos corretamente!");
    });

    it('cadastro produto sem valor_pago', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        const response = await request(app)
            .post('/produto')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                tipo: faker.commerce.productName(),
                marca: faker.lorem.word(),
                descricao: faker.lorem.words(),
                preco_base: 20,
                quantidade: 10
            });

        expect(response.body).toEqual("Campos não preenchidos corretamente!");
    });

    it('cadastro produto sem preco_base', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        const response = await request(app)
            .post('/produto')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                tipo: faker.commerce.productName(),
                marca: faker.lorem.word(),
                descricao: faker.lorem.words(),
                valor_pago: faker.commerce.price(),
                quantidade: 10
            });

        expect(response.body).toEqual("Campos não preenchidos corretamente!");
    });

    // it('cadastro produto sem quantidade', async () => {
    //     const token = await request(app)
    //     .post('/login')
    //     .send({
    //         email: 'gabriel.almeida.resende@gmail.com',
    //         senha: 'Dexaqeto1@'
    //     });

    //     const response = await request(app)
    //         .post('/produto')
    //         .set('Authorization', `Bearer ${token.body.token}`)
    //         .send({
    //             nome: faker.commerce.productName(),
    //             tipo: faker.commerce.productName(),
    //             marca: faker.lorem.word(),
    //             descricao: faker.lorem.words(),
    //             valor_pago: faker.commerce.price(),
    //             preco_base: 20
    //         });

    //     expect(response.body).toEqual("Campos não preenchidos corretamente!");
    // });

    it('cadastro de produto ja existente', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .post('/produto')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: 'teste',
                tipo: 'teste',
                marca: 'teste',
                descricao: 'teste',
                valor_pago: 30,
                preco_base: 20,
                quantidade: 10
            });

        expect(response.body).toEqual({
            "error": "Produto já cadastrado na base de dados!"
        });
    });

    it('atualizar produto', async () => {
        const token = await request(app)
            .post('/login')
            .send({
                email: 'gabriel.almeida.resende@gmail.com',
	            senha: 'Dexaqeto1@'
            });

        const response = await request(app)
            .put('/produto/2')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: 'teste',
                tipo: 'teste',
                marca: 'teste',
                descricao: 'teste',
                valor_pago: 30,
                preco_base: 20,
                quantidade: 10
            });
        
        expect(response.body).toEqual({
            "message": "Produto atualizado com sucesso!"
        });
    });

    it('atualizar produto inexistente', async() => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        const response = await request(app)
            .put('/produto/100000')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: 'teste',
                tipo: 'teste',
                marca: 'teste',
                descricao: 'teste',
                valor_pago: 30,
                preco_base: 20,
                quantidade: 10
            });
        
        expect(response.body).toEqual({
            "error": "Produto não encontrado na base de dados!"
        });
    });

    it('desativar produto', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        const response = await request(app)
            .put('/produto/deactivate/2')
            .set('Authorization', `Bearer ${token.body.token}`);
        
        expect(response.body).toEqual({
            "message": "Produto desativado!"
        });

        // await request(app)
        // .put('/produto/2')
        // .set('Authorization', `Bearer ${token.body.token}`)
        // .send({
        //     nome: 'teste',
        //     tipo: 'teste',
        //     marca: 'teste',
        //     descricao: 'teste',
        //     valor_pago: 30,
        //     preco_base: 20,
        //     quantidade: 10,
        //     inatividade: 1
        // });
    });

    it('desativar produto ja desativado', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        // await request(app)
        //     .put('/produto/deactivate/2')
        //     .set('Authorization', `Bearer ${token.body.token}`);

        const response = await request(app)
            .put('/produto/deactivate/2')
            .set('Authorization', `Bearer ${token.body.token}`);
        
        expect(response.body).toEqual({
            "error": "Produto já desativado na base de dados!"
        });

        // await request(app)
        // .put('/produto/2')
        // .set('Authorization', `Bearer ${token.body.token}`)
        // .send({
        //     nome: 'teste',
        //     tipo: 'teste',
        //     marca: 'teste',
        //     descricao: 'teste',
        //     valor_pago: 30,
        //     preco_base: 20,
        //     quantidade: 10,
        //     inatividade: 1
        // });
    });

    it('atualizar produto sem nome', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        const response = await request(app)
            .put('/produto/2')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                tipo: faker.commerce.productName(),
                marca: faker.lorem.word(),
                descricao: faker.lorem.words(),
                valor_pago: faker.commerce.price(),
                preco_base: 20,
                quantidade: 10
            });

        expect(response.body).toEqual("Campos não preenchidos corretamente!");
    });

    it('atualizar produto sem tipo', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        const response = await request(app)
            .put('/produto/2')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                marca: faker.lorem.word(),
                descricao: faker.lorem.words(),
                valor_pago: faker.commerce.price(),
                preco_base: 20,
                quantidade: 10
            });
        
        expect(response.body).toEqual("Campos não preenchidos corretamente!");
    });

    it('atualizar produto sem marca', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        const response = await request(app)
            .put('/produto/2')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                tipo: faker.commerce.productName(),
                descricao: faker.lorem.words(),
                valor_pago: faker.commerce.price(),
                preco_base: 20,
                quantidade: 10
            });
        
        expect(response.body).toEqual("Campos não preenchidos corretamente!");
    });

    it('atualizar produto sem descricao', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        const response = await request(app)
            .put('/produto/2')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                tipo: faker.commerce.productName(),
                marca: faker.lorem.word(),
                valor_pago: faker.commerce.price(),
                preco_base: 20,
                quantidade: 10
            });

        expect(response.body).toEqual("Campos não preenchidos corretamente!");
    });

    it('atualizar produto sem valor_pago', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        const response = await request(app)
            .put('/produto/2')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                tipo: faker.commerce.productName(),
                marca: faker.lorem.word(),
                descricao: faker.lorem.words(),
                preco_base: 20,
                quantidade: 10
            });

        expect(response.body).toEqual("Campos não preenchidos corretamente!");
    });

    it('atualizar produto sem preco_base', async () => {
        const token = await request(app)
        .post('/login')
        .send({
            email: 'gabriel.almeida.resende@gmail.com',
            senha: 'Dexaqeto1@'
        });

        const response = await request(app)
            .put('/produto/2')
            .set('Authorization', `Bearer ${token.body.token}`)
            .send({
                nome: faker.commerce.productName(),
                tipo: faker.commerce.productName(),
                marca: faker.lorem.word(),
                descricao: faker.lorem.words(),
                valor_pago: faker.commerce.price(),
                quantidade: 10
            });

        expect(response.body).toEqual("Campos não preenchidos corretamente!");
    });
});