/*********************************************************************************************************
 * Objetivo: Nesta primeira etapa você foi convidado a criar uma API com apenas 02 Endpoints do tipo GET. 
 * Nome: beckerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
 * Data: 25/01/2024
 * Versão: 1.0.0
 *********************************************************************************************************/ 

/*
    Para realizar o acesso a Banco de Dados precisamos instalar algumas bibliotecas:

        - SEQUELIZE     - É uma biblioteca mais antiga
        - PRISMA ORM    - É uma biblioteca mais atual (será utilizado no projeto)
        - FASTFY ORM    - É uma biblioteca mais atual

        para instalar o PRISMA:
            - npm install prisma --save  (Irá realizar a conexão com BD)
            - npm install @prisma/client --save (Irá executar os scripts SQl no BD)

        Após a instalação das bibliotecas, devemos inicializar o prisma no projeto:
            - npx prisma init (Irá inicializar o PRISMA)

        Para reinstalar o prisma e atualizar as dependências:   
            - npm i (Irá atualizar todas as dependências)
            - no package.json caso não queira atualizar todas as dependências basta tirar o "^" do @prisma/client

        Caso troque de máquina e sincronizar o Banco de Dados novamente: 
            - npx prisma generate (Serve para ressincronizar o Banco de Dados)

 */

//Importar as bibliotecas do projeto
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const funcoes = require('./Controller/funcoes.js')
const app = express()
app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()
})

/*  Importar os arquivos da controller do projeto */
        const controllerFilmes = require('./Controller/controller_filme.js');
        const controllerGenero = require('./Controller/controller_genero.js');
        const controllerClassificacao = require('./Controller/controller_classificacao.js');
        const controllerAtores = require('./Controller/controller_atores.js');
        const controllerDiretores = require('./Controller/controller_diretores.js');

/* Criando um objeto para controlar a chegada dos dados da requisição em formato JSON */
    const bodyParserJSON = bodyParser.json();


//EndPoint: Versão 1.0 - retorna todos os filmes do arquivo filmes.js pelo ID
          //Periodo de funcionamento: 01/2024 até 02/2024
app.get('/v1/ACMEFilmes/filmes', cors(), async function(request, respose, next) {

    respose.json(funcoes.getListarTodosFilmes())
    respose.status(200)

})

//EndPoint: Versão 1.0 - retorna todos os filmes do arquivo filmes.js pelo ID
          //Periodo de funcionamento: 01/2024 até 02/2024
app.get('/v1/ACMEFilmes/filme/:id', cors(), async function(request, response, next) {
    
    let idGenero = request.params.id

    response.json(funcoes.getDadosFilmes(idGenero))
    
    response.status(200)
})

//EndePoint: Versão 2.0 - retorna todos os filmes do Banco de Dados
           //Periodo de funcionamento: 02/2024
app.get('/v2/ACMEFilmes/filmes', cors(), async function(request, response) {

    //Chama a função da controller para retornar os filmes
    let dadosFilmes = await controllerFilmes.getListarFilmes();

    //Validação para retornar o JSON dos filmes ou retornar 404
    if(dadosFilmes) {
        response.json(dadosFilmes);
        response.status(200);
    }else {
        response.json({message: 'Nenhum requisito foi encontrado'});
        response.status(404);
    }
})

//EndPoint: Retorna o filme filtrando pelo ID
app.get('/v2/ACMEFilmes/filme/:id', cors(), async function(request, response) {

    //Recebe o ID da requisição
    let idGenero = request.params.id;

    //Encaminha o ID para a controller buscar o filme
    let dadosFilme = await controllerFilmes.getBuscarFilme(idGenero);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme);
})

app.get('/v2/ACMEFilmes/filmes/filtro', cors(), async function(request, response) {

    let filtro = request.query.nome;

    let dadosFilmes = await controllerFilmes.getFilmesNome(filtro);

    response.status(dadosFilmes.status_code);
    response.json(dadosFilmes);
})

app.post('/v2/ACMEFilmes/filme', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisisão
    let contentType = request.headers['content-type'];

    //Recebe todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body;

    //Encaminha os dados para o controller enviar para o DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType);
    
    response.status(resultDadosNovoFilme.status_code);
    response.json(resultDadosNovoFilme);
})

app.put('/v2/ACMEFilmes/update/:id', cors(), bodyParserJSON, async function(request, response){

    let idGenero = request.params.id
    let contentType = request.headers['content-type'];
    let dadosBody = request.body;
    let updateFilme = await controllerFilmes.setAtualizarFilme(idGenero, dadosBody, contentType);

    response.status(updateFilme.status_code);
    response.json(updateFilme);
})

app.delete('/v2/ACMEFilmes/deleteFilme/:id', cors(), bodyParserJSON, async function(request, response){

    let idGenero = request.params.id;
    let dadosFilme = await controllerFilmes.setExcluirFilme(idGenero);

    response.status(dadosFilme.status_code);
    response.json(dadosFilme);
})

//genero



//id genero

app.get('/v2/ACMEFilmesgeid/filme/:id', cors(), async function(request, response) {

    //Recebe o ID da requisição
    let idGenero = request.params.id;

    //Encaminha o ID para a controller buscar o filme
    let dadosGenero = await controllerGenero.getBuscarGenero(idGenero);

    response.status(dadosGenero.status_code);
    response.json(dadosGenero);
})

app.get('/v2/ACMEFilmes/generos', cors(), async function(request, response, next){
    let dadosGenero = await controllerGenero.getListarGenero()

    if (dadosGenero){
    response.json(dadosGenero)
    response.status (200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

app.post('/v2/acmeFilmes/generos', cors(), bodyParserJSON, async function(request, response, next){

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultDados = await controllerGenero.setInserirNovoGenero(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/AcmeFilmes/generos/:id',  cors(), bodyParserJSON, async (request, response, next) => {
   
    let idGenero = request.params.id
    let dadosGenero = await controllerGenero.setExcluirGenero(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

app.put('/v2/AcmeFilmesgenero/update/:id', cors(), bodyParserJSON, async function(request,response,next){

    let GenerosID = request.params.id
    let dadosGenero = request.body
    console.log(dadosGenero)
    let contentType = request.headers['content-type'];
    let resultUptadedGenero = await controllerGenero.setAtualizarGenero(GenerosID, dadosGenero,contentType);

    response.status(resultUptadedGenero.status_code)
    response.json(resultUptadedGenero)
})

//classificacao

//id classificação

app.get('/v2/ACMEFilmesclaid/filme/:id', cors(), async function(request, response) {

    //Recebe o ID da requisição
    let idClassificacao = request.params.id;

    //Encaminha o ID para a controller buscar o filme
    let dadosClassificacao = await controllerClassificacao.getBuscarClassificacao(idClassificacao);

    response.status(dadosClassificacao.status_code);
    response.json(dadosClassificacao);
})

app.get('/v2/Acme/Classificacao', cors(), async function(request, response, next){
    let dadosClassificacao = await controllerClassificacao.getListarClassificacao()

    if (dadosClassificacao){
    response.json(dadosClassificacao)
    response.status (200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

app.post('/v2/Acme/Classificacao', cors(), bodyParser.json(), async function(request, response, next){
    let contentType = request.headers['content-type']
    console.log('contentType')
    let dadosBody = request.body
    let resultDados = await controllerClassificacao.setInserirClassificacao(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})


app.delete('/v2/Acme/Classificacao/:id',  cors(), bodyParserJSON, async (request, response, next) => {
   
    let idClassificacao = request.params.id
    let dadosClassificacao = await controllerClassificacao.setExcluirClassificacao(idClassificacao)

    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})

app.put('/v2/AcmeClassificacao/update/:id', cors(), bodyParserJSON, async function(request,response,next){

    let ClassificacaoID = request.params.id
    let dadosClassificacao = request.body
    console.log(dadosClassificacao)
    let contentType = request.headers['content-type'];
    let resultUptadedClassificacao = await controllerClassificacao.setAtualizarClassificacao(ClassificacaoID, dadosClassificacao,contentType);

    response.status(resultUptadedClassificacao.status_code)
    response.json(resultUptadedClassificacao)

})

//atores

app.get('/v2/ACMEFilmesatoid/filme/:id', cors(), async function(request, response) {

    //Recebe o ID da requisição
    let idAtores = request.params.id;

    //Encaminha o ID para a controller buscar o filme
    let dadosAtores = await controllerAtores.getBuscarAtores(idAtores);

    response.status(dadosAtores.status_code);
    response.json(dadosAtores);
})

app.get('/v2/AcmeAtores/atores', cors(), async function(request, response, next){
    let dadosAtores = await controllerAtores.getListarAtores()

    if (dadosAtores){
    response.json(dadosAtores)
    response.status (200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }

})
app.post('/v2/AcmeAtores/atores', cors(), bodyParser.json(), async function(request, response, next){
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultDados = await controllerAtores.setInserirAtores(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})


app.delete('/v2/AcmeAtores/atores/:id',  cors(), bodyParserJSON, async (request, response, next) => {
   
    let idAtores = request.params.id
    let dadosAtores = await controllerAtores.setExcluirAtores(idAtores)

    response.status(dadosAtores.status_code)
    response.json(dadosAtores)

})

app.put('/v2/AcmeAtores/update/:id', cors(), bodyParserJSON, async function(request,response,next){

    let atoresID = request.params.id
    let dadosAtores = request.body
    console.log(dadosAtores)
    let contentType = request.headers['content-type'];
    let resultUptadedAtores = await controllerAtores.setAtualizarAtores(atoresID, dadosAtores,contentType);

    response.status(resultUptadedAtores.status_code)
    response.json(resultUptadedAtores)

})

//diretores

//id diretores

app.get('/v2/ACMEFilmesdireid/filme/:id', cors(), async function(request, response) {

    //Recebe o ID da requisição
    let idDiretor = request.params.id;

    //Encaminha o ID para a controller buscar o filme
    let dadosDiretores = await controllerDiretores.getBuscarDiretores(idDiretor);

    response.status(dadosDiretores.status_code);
    response.json(dadosDiretores);
})

app.get('/v2/AcmeFilmes/diretores', cors(), async function(request, response, next){
    let dadosAtores = await controllerDiretores.getListarDiretores()
    if (dadosAtores){
    response.json(dadosAtores)
    response.status (200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

app.post('/v2/AcmeFilmes/diretores', cors(), bodyParser.json(), async function(request, response, next){
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultDados = await controllerDiretores.setInserirDiretores(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/AcmeFilmes/diretores/:id',  cors(), bodyParserJSON, async (request, response, next) => {
   
    let idDiretor = request.params.id
    let dadosDiretores = await controllerDiretores.setExcluirDiretores(idDiretor)

    response.status(dadosDiretores.status_code)
    response.json(dadosDiretores)
})

app.put('/v2/AcmeFilmesdire/update/:id', cors(), bodyParserJSON, async function(request,response,next){

    let diretorID = request.params.id
    let dadosDiretores = request.body
    console.log(dadosDiretores)
    let contentType = request.headers['content-type'];
    let resultUptadedDiretores = await controllerDiretores.setAtualizarDiretores(diretorID, dadosDiretores,contentType);

    response.status(resultUptadedDiretores.status_code)
    response.json(resultUptadedDiretores)
})

//Executa a API e faz ela ficar aguardando requisições
app.listen('8080', function() {
    console.log('API funcionando!!')
})