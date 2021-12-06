import request from 'supertest';
import app from '../../src/app'

const MOCK_CADASTRO_ADMIN = {
  email: 'produto@hotmail.com',
  password: '123456'
}

const MOCK_LOGIN = {
  email: "produto@hotmail.com",
  password: "123456"
}
const MOCK_CADASTRO_PRODUTO = {
  codigo: "1",
  descricao: "bala de mascar",
  preco: 200.00,
  tipoEmbalagem: "1",
  quantidadeEmbalagem: 1,
  peso: 10
}
const MOCK_CADASTRO_FAIL_SCHEMA = {
  codigo: "0000067",
  descricao: "bala de mascar",
  preco: 200.00,
  peso: 10
}
const MOCK_CADASTRO_FAIL_TE_UNIDADE = {
  codigo: "0000067",
  descricao: "bala de mascar",
  preco: 200.00,
  tipoEmbalagem: "1",
  quantidadeEmbalagem: 2,
  peso: 10
}
const MOCK_CADASTRO_FAIL_TE_PACK_CAIXA = {
  codigo: "0000067",
  descricao: "bala de mascar",
  preco: 200.00,
  tipoEmbalagem: "2",
  quantidadeEmbalagem: 1,
  peso: 10
}
const MOCK_UPDATE_PRODUTO = {
  descricao: "chiclete de mascar",
  preco: 200.00,
  tipoEmbalagem: "1",
  quantidadeEmbalagem: 1,
  peso: 10
}
const MOCK_UPDATE_FAIL_QUANTIDADE_EMBALAGEM = {
  descricao: "bala de mascar",
  preco: 200.00,
  quantidadeEmbalagem: 2,
  peso: 10
}
let token = ""
let idAdmin = ''
let MOCK_CODIGO = ''

describe('Produtos', () => {
  it('deve ser cadastrado admin', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send(MOCK_CADASTRO_ADMIN);
    // pega id do usuario cadastrado e seta variavel id 
    idAdmin = response.body.id;
    expect(response.statusCode).toEqual(200)
  });

  it('deve logar se email existir', async () => {
    const response = await request(app)
      .post('/api/v1/login')
      .send(MOCK_LOGIN);
    token = response.body.token
    
    expect(response.statusCode).toEqual(200)
  });
  it('deve ser cadastrado Produto', async () => {

    const response = await request(app)
      .post('/api/v1/produtos')
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_CADASTRO_PRODUTO);
    MOCK_CODIGO = response.body.codigo
    //se cadastrou espera que retorne statuscode 200
    expect(response.statusCode).toEqual(200)
  });

  it('nao deve cadastrar se faltar algum campo', async () => {
    const response = await request(app)
      .post('/api/v1/produtos')
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_CADASTRO_FAIL_SCHEMA);


    expect(response.body.error).toEqual("Validacao Falhou")
  });

  it('nao deve ser cadastrado Produto - tipo embalagem unidade', async () => {

    const response = await request(app)
      .post('/api/v1/produtos')
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_CADASTRO_FAIL_TE_UNIDADE);

    expect(response.body).toEqual({"error": "So e permitido 1 embalagem para este tipo de embalagem"})
  });

  it('nao deve ser cadastrado Produto - tipo embalagem pack - caixa', async () => {

    const response = await request(app)
      .post('/api/v1/produtos')
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_CADASTRO_FAIL_TE_PACK_CAIXA);

    expect(response.body).toEqual({"error": "Para este tipo de embalagem a quantidade de embalagem deve ser maior que 1"})
  });

  it('deve listar produtos', async () => {
    const response = await request(app)
      .get('/api/v1/produtos')
      .set("Authorization", `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
  });


  it('deve atualizar produto cadastrado', async () => {
    const response = await request(app)
      .put(`/api/v1/produto/${MOCK_CODIGO}`)
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_UPDATE_PRODUTO);
    
    expect(response.body).toEqual({"codigo": parseInt(MOCK_CODIGO)})
  });

  it('nao deve atualizar item cadastrado se quantida embalagem maior que o tipoEmbalagem cadastrado', async () => {

    const response = await request(app)
      .put(`/api/v1/produto/${MOCK_CODIGO}`)
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_UPDATE_FAIL_QUANTIDADE_EMBALAGEM);

      expect(response.body).toEqual({ error: 'So e permitido 1 embalagem para o tipo de embalagem cadastrada' })
      
  });

  it('deve deletar produto cadastrado', async () => {
    const response = await request(app)
      .delete(`/api/v1/produto/${MOCK_CODIGO}`)
      .set("Authorization", `Bearer ${token}`)

    //se deletou retorna statuscode 200
    expect(response.status).toBe(200)
  });

  it('deve deletar administrador', async () => {
    const response = await request(app)
      .delete(`/api/v1/users/${idAdmin}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
  });

}); 