import request from 'supertest';
import app from '../../src/app'
const MOCK_CADASTRO_ADMIN = {
  email: 'admin@hotmail.com',
  password: '123456'
}

const MOCK_LOGIN = {
  email: "admin@hotmail.com",
  password: "123456"
}

const MOCK_UPDATE_NOTPASSWORD = {
  email: 'her@hotmail.com',

}

const MOCK_CADASTRO_FAIL_CAMPO = {
  email: '',
  password: ''
}
const MOCK_UPDATE = {
  email: "nani3@hotmail.com",
  oldPassword: "123456",
  password: "1234567",
  confirmPassword: "1234567"

}
const MOCK_UPDATE_FAIL = {
  email: "nani3@hotmail.com",
  oldPassword: "12345689098",
  password: "1234567",
  confirmPassword: "1234567"

}
let token = ''
let id = ''


describe('Cadastrando usuarios', () => {
  it('deve ser cadastrado usuario', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send(MOCK_CADASTRO_ADMIN);

    id = response.body.id;
    expect(response.statusCode).toEqual(200)
  });

  it('deve logar se email existir', async () => {
    const response = await request(app)
      .post('/api/v1/login')
      .send(MOCK_LOGIN);
    token = response.body.token

    expect(response.statusCode).toEqual(200)
  });

  it('nao deve cadastrar se faltar algum campo', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send(MOCK_CADASTRO_FAIL_CAMPO);


    expect(response.body.error).toEqual("Validacao Falhou")
  });

  it('nao deve cadastrar se schema invalido', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send();


    expect(response.body.error).toEqual("Validacao Falhou")
  });

  it('deve atualizar usuario', async () => {
    const response = await request(app)
      .put(`/api/v1/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_UPDATE,);

    expect(response.body).toEqual({"email": MOCK_UPDATE.email})
  });
  it('atualizar usuario apenas email se nao for alterar password', async () => {
    const response = await request(app)
      .put(`/api/v1/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_UPDATE_NOTPASSWORD,);

    expect(response.body).toEqual(
      { "email": MOCK_UPDATE_NOTPASSWORD.email }
    )
  });

  it('nao deve atualizar usuario oldpassword incorreta ou sem informar', async () => {
    const response = await request(app)
      .put(`/api/v1/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_UPDATE_FAIL,);

    expect(response.body.error).toEqual('Senha difere da atual');
  });

  it('deve deletar usuario', async () => {
    const response = await request(app)
      .delete(`/api/v1/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toEqual(200)
  });


});