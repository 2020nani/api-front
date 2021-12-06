# CONTELE
Desenvolvido por Hernani Amancio de Almeida

## Executar projeto

Para executar o projeto, sera necessario instalar os seguintes programas em seu computador:

 - Nodejs
 - Docker
 - Docker Compose
 - Postbird
 - yarn

Para iniciar o projeto e necessario clonar o projeto do Github num diretorio de sua preferencia com os seguintes comandos:

cd "diretorio de sua preferencia"
git clone https://github.com/2020nani/api-front.git
cd api-front
Feito isso e necessario criar os containers docker para rodar o front e o back:

para criar o container da api, dentro da pasta raiz do projeto de o comando cd serverMtrix e depois o comando docker-compose up -d
Obs: Certifique que o docker esta rodando
Feito isso sera necessario entrar na cli de comando do container da api no docker e executar o comando yarn sequelize db:migrate para criar as tabelas no banco de dados

Acesse seu banco de dados com o Postbird que pedira as variaveis ambiente contidas no arquivo docker-compose.yml do service postgres

Feito isso voce pode acessar a api em seu computador na porta 3333 e a documentacao dela na url http://localhost:3333/api-docs
Obs: Certifique que o container docker foi criado e esta rodando

Agora e necessario criar o container do front para isso de o comando cd ../Mtrix no terminal, para acessar a pasta onde esta o codigo do front

Dentro desta pasta no terminal de o comando docker-compose up -d

Feito isso voce pode acessar a front em seu computador no endereco http://localhost:3000 e nosso projeto estara rodando dentro dos containers docker
Obs: Certifique que o container docker foi criado e esta rodando

## Desenvolvimento

Para iniciar o desenvolvimento e necessario rodar os seguintes comandos dentro da pasta raiz de cada projeto (serverMtrix, frontMtrix):

- `npm install` ou `yarn` caso tenha yarn instalado em sua maquina

No diretoria da api rode o comando yarn sequelize db:migrate para criar as tabelas no banco de dados

Rode a api em seu computador na porta 3333 sem utilizar o docker com o seguinte comando dentro da pasta serverContele

- `npm run dev` ou
- `yarn dev`

Rode o  front em seu computador na porta 3000 sem utilizar o docker com o seguinte comando dentro da pasta frontContele

- `npm run start` ou
- `yarn start`
