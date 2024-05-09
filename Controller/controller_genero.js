
const message = require('../model/config')
const generoDAO = require('../model/DAO/genero.js')

const setInserirNovoGenero = async function (dadosGenero, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let novoGeneroJSON = {}

            if (dadosGenero.nome == '')

                return message.ERROR_REQUIRED_FIELDS

            else {

                let novoGenero = await generoDAO.inserirGenero(dadosGenero)

                if (novoGenero) {
                    novoGeneroJSON.genero = dadosGenero
                    novoGeneroJSON.status = message.SUCCESS_CREATED_ITEM.status
                    novoGeneroJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novoGeneroJSON.message = message.SUCCESS_CREATED_ITEM.message

                    return novoGeneroJSON
                }
                else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarGenero = async function(id, dadosGenero, contentType){
    
    try{
        if (String (contentType).toLowerCase() == 'application/json'){
            let statusValidated = false
            let atualizarGeneroJSON={}
    
            console.log(dadosGenero.nome)
            if( dadosGenero.nome             == '' || dadosGenero.nome            == undefined || dadosGenero.nome            == null || dadosGenero.nome.length              > 20    ){
                return message.ERROR_REQUIRED_FIELDS 
            }else{
                statusValidated = true
            }
                    if (statusValidated){
                        let generoAtualizado = await generoDAO.atualizarGenero(id, dadosGenero)

                        console.log(generoAtualizado)
                        if(generoAtualizado){
                            atualizarGeneroJSON.status         = message.SUCCESS_UPDATED_ITEM.status;
                            atualizarGeneroJSON.status_code    = message.SUCCESS_UPDATED_ITEM.status_code;
                            atualizarGeneroJSON.message        = message.SUCCESS_UPDATED_ITEM.message,
                            atualizarGeneroJSON.id = id,
                            atualizarGeneroJSON.genero          = dadosGenero
                
                            return atualizarGeneroJSON
                        }else{
                            return message.ERROR_INTERNAL_SERVER_DB 
                        }
                     }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    }catch(error){
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirGenero = async function (id) {
    try {
        let idGenero = id

        let validaGenero = await getBuscarGenero(idGenero)

        let dadosGenero = await generoDAO.deletarGenero(idGenero)

        if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {

            return message.ERROR_INVALID_ID 

        } else if(validaGenero.status == false){
            return message.ERROR_NOT_FOUND

        } else {
            
            if(dadosGenero)
                return message.SUCCESS_DELETED_ITEM 
            else
                return message.ERROR_INTERNAL_SERVER_DB

        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarGenero = async function(){

        let generosJSON = {}

        let dadosGenero = await generoDAO.selecionarGeneros()
    

        if(dadosGenero){

            generosJSON.filmes = dadosGenero
            generosJSON.quantidade = dadosGenero.length
            generosJSON.status_code = 200
    
            return generosJSON
        }else{
            return false
        }
    }
//testeeeeeeeeeeeeeeeeeeeeeeeeeeee
    const getBuscarGenero = async function(id){
        let idGenero = id
        let generoJSON = {}
    
        if (idGenero == '' || idGenero == undefined || isNaN(idGenero)){
            return message.ERROR_INVALID_ID
        }else{
    
            let dadosGenero = await generoDAO.selecionarIdGenero(idGenero)
            if(dadosGenero){
    
                if(dadosGenero.length > 0){
                generoJSON.genero = dadosGenero
                generoJSON.status_code = 200
    
                return generoJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
            }else{
               return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    }


const getBuscarFilme = async function(id) {

    //Recebe o ID do genero
    let idGenero = id;
    //Cria o objeto JSON
    let generosJSON = {}

    //Validação para verificar se o ID é valido (vazio, indefinido ou não numérico)
    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROR_INVALID_ID; //400
    }else {

        //Encaminha o ID para o DAO buscar no Banco de dados 
        let dadosGenero = await generoDAO.selectByidGenero(idGenero);

        //Verifica se o DAO retornou dados
        if (dadosGenero) {

            //Validação para verificar a quantidade de itens retornados
            if (dadosGenero.length > 0) {

                //Cria JSON para retorno
                generosJSON.filme = dadosGenero;
                generosJSON.status_code = 200;

                return generosJSON;

            }else {

                return message.ERROR_NOT_FOUND; //404
            }

        }else {

            return message.ERROR_INTERNAL_SERVER_DB; //500

        }
    }
}

module.exports = {
    setInserirNovoGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getListarGenero,
    getBuscarGenero
  }