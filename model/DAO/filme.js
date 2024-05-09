/*******************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acessp ap Banco de dados MySQL, aqui faremos o CRUD na tabela de filme 
 * Data: 01/02/2024
 * Autor: beckerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
 * Versão: 1.0.0
 *******************************************************************************************************************************************/

//Importa da biblioteca do prisma client para manipular scripts SQL
const {PrismaClient} = require('@prisma/client');

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

//Função para inserir um filme no BD
const insertFilme = async function(dadosFilme) {
    
    try {

        let sql;

        if (dadosFilme.data_relancamento != ''      &&
            dadosFilme.data_relancamento != null    &&
            dadosFilme.data_relancamento != undefined) {

            sql = `insert into tbl_filme (
                nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario
        ) values (
                '${dadosFilme.nome}',
                '${dadosFilme.sinopse}',
                '${dadosFilme.duracao}',
                '${dadosFilme.data_lancamento}',
                '${dadosFilme.data_relancamento}',
                '${dadosFilme.foto_capa}',
                '${dadosFilme.valor_unitario}'
            )`;
        }else {
            
            sql = `insert into tbl_filme (
                nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario
        ) values (
            '${dadosFilme.nome}',
            '${dadosFilme.sinopse}',
            '${dadosFilme.duracao}',
            '${dadosFilme.data_lancamento}',
        null,
            '${dadosFilme.foto_capa}',
            '${dadosFilme.valor_unitario}'
            )`
        }
        //$executeRawUnsafe() - serve para executar scripts sem retorno de dados (insert, update e delete)
        //$queryRawUnsafe() - serve para executar scripts com retorno de dados (select)
        let result = await prisma.$executeRawUnsafe(sql);
    
        if (result)
            return true;
        else 
            return false;

    } catch (error) {
        return false;
    }
}

//Função para atualizar um filme no BD
const updateFilme = async function(id, dadosFilme) {
    try{

        let sql;

        if (dadosFilme.data_relancamento != ''      &&
            dadosFilme.data_relancamento != null    &&
            dadosFilme.data_relancamento != undefined) {

                sql = `update tbl_filme set
                                               nome = '${dadosFilme.nome}',
                                               sinopse = '${dadosFilme.sinopse}',
                                               duracao = '${dadosFilme.duracao}',
                                               data_lancamento = '${dadosFilme.data_lancamento}',
                                               data_relancamento = '${dadosFilme.data_relancamento}',
                                               foto_capa = '${dadosFilme.foto_capa}',
                                               valor_unitario = '${dadosFilme.valor_unitario}'
                where id = ${id}`;
        }else {
            sql = `update tbl_filme set
                                               nome = '${dadosFilme.nome}',
                                               sinopse = '${dadosFilme.sinopse}',
                                               duracao = '${dadosFilme.duracao}',
                                               data_lancamento = '${dadosFilme.data_lancamento}',
                                               data_relancamento = null,
                                               foto_capa = '${dadosFilme.foto_capa}',
                                               valor_unitario = '${dadosFilme.valor_unitario}'
                    where id = ${id}`;
        }

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
        else
            return false;

    }catch(error){
        return false;
    }
}

//Função para excluir um filme no BD
const deleteFilme = async function(id) {
    try {

        let sql = `delete from tbl_filme where id = ${id}`;

        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
        
    } catch(error) {
        return false
    }
}

//Função para listar todos os filmes do BD
const selectAllFilmes = async function() {

    //Script SQL para o Banco de Dados
    let sql = 'select * from tbl_filme';

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme')

    //Executa o script SQl no Banco de Dados e recebe o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    //Validação para retornar os dados
    if(rsFilmes.length > 0)
        return rsFilmes;
    else 
        return false;
}

//Função para buscar um filme no BD filtrando pelo ID
const selectByIDFilme = async function(id) {
    try {
        //Script SQL para filtrar pelo ID
        let sql = `select * from tbl_filme where id = ${id}`;

        //Executa o SQL no Banco de Dados
        let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme;

    } catch (error) {
        return false;
    }
}

//Função para buscar um filme no BD filtrando pelo nome
const selectByNome = async function(nome) {
    try {
        
        let sql = `select * from tbl_filme where tbl_filme.nome like '%${nome}%'`;

        let rsFilmes = await prisma.$queryRawUnsafe(sql);

        return rsFilmes;
    } catch (error) {

        return false;
    }
}

//Função para mostrar o ID do filme no BD
const selectByLastId = async function() {
    try {

        let sql =  `select cast(last_insert_id() as decimal) as id from tbl_filme limit 1`;
        let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme;
    } catch (error) {
        return false;
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIDFilme,
    selectByNome,
    selectByLastId
}