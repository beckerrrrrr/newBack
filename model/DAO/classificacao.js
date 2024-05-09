const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();
const inserirClassificacao = async function(dadosClassificacao){

    try{
        let sql
        sql = `insert into tbl_classificacao(faixa_etaria,
                                            classificacao,
                                            caracteristica,
                                            icone
        )values(
                                            '${dadosClassificacao.faixa_etaria}',
                                            '${dadosClassificacao.classificacao}',
                                            '${dadosClassificacao.caracteristica}',
                                            '${dadosClassificacao.icone}'
        )`

        console.log(dadosClassificacao)
        let result = await prisma.$executeRawUnsafe(sql)
        if(result){
            return true
        }else{
            return false
        }
    }catch(errror){
        return false
    }
}
const selecionarClassificacao = async function(){

    let sql = 'select * from tbl_classificacao'

    let rsClassificacao = await prisma.$queryRawUnsafe(sql)
    if (rsClassificacao.length > 0){
    return rsClassificacao
}
    else{
    return false
}
}

const selecionarIdClassificacao = async function(id){
    try{
    let sql = `select * from tbl_classificacao where id= ${id}`
    let rsClassificacao = await prisma.$queryRawUnsafe(sql)
    return rsClassificacao
}
catch(error){
    return false
}}

const deletarClassificacao = async (id) => {

    try {
        let sql = `delete from tbl_classificacao where id = ${id}`
        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao
    } catch (error) {
        return false
    }

}

const atualizarClassificacao =async function(id, dadosClassificacao){
    try {
        sql = `update tbl_classificacao set 
                                                faixa_etaria ='${dadosClassificacao.faixa_etaria}',
                                                classificacao = '${dadosClassificacao.classificacao}',
                                                caracteristica = '${dadosClassificacao.caracteristica}',
                                                icone = '${dadosClassificacao.icone}'
                    where id = ${id}`
        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}
module.exports = {
    inserirClassificacao,
    selecionarClassificacao,
    deletarClassificacao,
    selecionarIdClassificacao,
    atualizarClassificacao
  }