const message = require('../model/config')
const atoresDAO = require('../model/DAO/atores.js')
const sexoDAO = require('../model/DAO/sexo.js')
const nacionalidadeDAO = require('../model/DAO/nacionalidade')

const setInserirAtores = async function(dadosAtores, contentType){

    try{

        if (String (contentType).toLowerCase() == 'application/json'){

            let statusValidate = false
            let newAtoresJSON = {}

            if (dadosAtores.nome == '' || dadosAtores.nome == undefined || dadosAtores.nome == null || dadosAtores.nome.length > 2000 ||
                dadosAtores.nome_artistico == ''|| dadosAtores.nome_artistico == undefined || dadosAtores.nome_artistico == null || dadosAtores.nome_artistico.length > 2000 ||
                dadosAtores.foto == ''|| dadosAtores.foto == undefined || dadosAtores.foto == null || dadosAtores.foto.length > 1000 ||
                dadosAtores.data_nascimento == ''|| dadosAtores.data_nascimento == undefined || dadosAtores.data_nascimento == null || dadosAtores.data_nascimento > 300 ||
                dadosAtores.data_falecimento == ''|| dadosAtores.data_falecimento == undefined || dadosAtores.data_falecimento == null || dadosAtores.data_falecimento > 300||
                dadosAtores.biografia == ''|| dadosAtores.biografia == undefined || dadosAtores.biografia == null || dadosAtores.biografia > 3000 ||
                dadosAtores.id_sexo == ''|| dadosAtores.id_sexo == undefined || dadosAtores.id_sexo == null 

                ){
                    return message.ERROR_REQUIRED_FIELDS
            }else{
                statusValidate = true
            }

            if(statusValidate){

                let newAtores = await atoresDAO.inserirAtores(dadosAtores)

                if(newAtores){

                    //insert_ator_nacionalidade(id_ator, dadosAtores.nacionalidade)

                    newAtoresJSON.status = message.SUCCESS_CREATED_ITEM.status
                    newAtoresJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    newAtoresJSON.message = message.SUCCESS_CREATED_ITEM.message
                    newAtoresJSON.atores = dadosAtores

                    return newAtoresJSON
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

const getListarAtores = async function(){

    let atoresJSON = {}
    let dadosAtores = await atoresDAO.selecionarAtores()

    if(dadosAtores){

        const promisse = dadosAtores.map(async(ator)=>{
            let sexoJSON = await sexoDAO.selecionarIdSexo(ator.id_sexo)
            ator.sexo = sexoJSON
            let nacionalidadeJSON = await nacionalidadeDAO.selecionarId(ator.id)
           
            if(nacionalidadeJSON.length > 0){ 
                ator.nacionalidade = nacionalidadeJSON
            }
        })

        await Promise.all(promisse)

        atoresJSON.ator = dadosAtores

        atoresJSON.quantidade = dadosAtores.length
        atoresJSON.status_code = 200

        return atoresJSON
    }else{
        return false
    }
}



const getBuscarAtores = async function(id){
    let idAtores = id
    let atoresJSON = {}

    if (idAtores == '' || idAtores == undefined || isNaN(idAtores)){
        return message.ERROR_INVALID_ID
    }else{

        let dadosAtores = await atoresDAO.selecionarIdAtores(idAtores)
        if(dadosAtores){

            if(dadosAtores.length > 0){
            atoresJSON.atores = dadosAtores
            atoresJSON.status_code = 200

            return atoresJSON
        }else{
            return message.ERROR_NOT_FOUND
        }
        }else{
           return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}

const setExcluirAtores = async function (id) {
    try {

        let idAtores = id

        let validaAtores = await getBuscarAtores(idAtores)

        let dadosAtores = await atoresDAO.deletarAtores(idAtores)

        if (idAtores == '' || idAtores == undefined || isNaN(idAtores)) {

            return message.ERROR_INVALID_ID 

        } else if(validaAtores.status == false){
            return message.ERROR_NOT_FOUND

        } else {
            
            if(dadosAtores)
                return message.SUCCESS_DELETED_ITEM 
            else
                return message.ERROR_INTERNAL_SERVER_DB

        }


    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarAtores = async function(id, dadosAtores, contentType){
    try{
        if (String (contentType).toLowerCase() == 'application/json'){
            let statusValidated = false
            let atualizarAtorJSON={}
        
            if (dadosAtores.nome == '' || dadosAtores.nome == undefined || dadosAtores.nome == null || dadosAtores.nome.length > 2000 ||
                dadosAtores.nome_artistico == ''|| dadosAtores.nome_artistico == undefined || dadosAtores.nome_artistico == null || dadosAtores.nome_artistico.length > 2000 ||
                dadosAtores.foto == ''|| dadosAtores.foto == undefined || dadosAtores.foto == null || dadosAtores.foto.length > 1000 ||
                dadosAtores.data_nascimento == ''|| dadosAtores.data_nascimento == undefined || dadosAtores.data_nascimento == null || dadosAtores.data_nascimento > 300 ||
                dadosAtores.data_falecimento == ''|| dadosAtores.data_falecimento == undefined || dadosAtores.data_falecimento == null || dadosAtores.data_falecimento > 300||
                dadosAtores.biografia == ''|| dadosAtores.biografia == undefined || dadosAtores.biografia == null || dadosAtores.biografia > 3000 ||
                dadosAtores.id_sexo == ''|| dadosAtores.id_sexo == undefined || dadosAtores.id_sexo == null
                ){
                return message.ERROR_REQUIRED_FIELDS 
            }else{
                statusValidated = true
            }
                    if (statusValidated){
                        let atorAtualizado = await atoresDAO.atualizarAtores(id, dadosAtores)

                        if(atorAtualizado){
                            atualizarAtorJSON.status         = message.SUCCESS_UPDATED_ITEM.status;
                            atualizarAtorJSON.status_code    = message.SUCCESS_UPDATED_ITEM.status_code;
                            atualizarAtorJSON.message        = message.SUCCESS_UPDATED_ITEM.message,
                            atualizarAtorJSON.id = id,
                            atualizarAtorJSON.atores          = dadosAtores
                
                            return atualizarAtorJSON
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

//Função para buscar um filme pelo ID
const getBuscarAtor = async function(id) {

    //Recebe o ID do Filme 
    let idAtores = id;
    //Cria o objeto JSON
    let atoresJSON = {}

    //Validação para verificar se o ID é valido (vazio, indefinido ou não numérico)
    if (idAtores == '' || idAtores == undefined || isNaN(idAtores)) {
        return message.ERROR_INVALID_ID; //400
    }else {

        //Encaminha o ID para o DAO buscar no Banco de dados 
        let dadosAtores = await atoresDAO.selectByIDAtor(idAtores);

        //Verifica se o DAO retornou dados
        if (dadosAtores) {

            //Validação para verificar a quantidade de itens retornados
            if (dadosAtores.length > 0) {

                //Cria JSON para retorno
                atoresJSON.filme = dadosAtores;
                atoresJSON.status_code = 200;

                return atoresDAOJSON;

            }else {

                return message.ERROR_NOT_FOUND; //404
            }

        }else {

            return message.ERROR_INTERNAL_SERVER_DB; //500

        }
    }
}


module.exports = {
    setInserirAtores,
    setExcluirAtores,
    getBuscarAtores,
    getListarAtores,
    setAtualizarAtores,
    
  }