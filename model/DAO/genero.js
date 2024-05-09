/*********************************
 * Data: 26/04/2024
 * Autor: Beckerr
 * Versão: 1.0
 *********************************/

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

 const inserirGenero=async function(dadosGenero){
    try {
        let sql=`insert into tbl_genero (
                nome
            ) values(
                    '${dadosGenero.nome}'
            )`
            let result=await prisma.$executeRawUnsafe(sql)
            if(result)
                return true
            else
                return false
    } catch (error) {
        return false
    }
}

 const atualizarGenero=async function(id, dadosGenero){
    try {
        let sql=`
            update tbl_genero 

            set 
                nome="${dadosGenero.nome}"

            where id=${id};
        `
        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

 const deletarGenero = async (id) => {

    try {
        let sql = `delete from tbl_genero where id = ${id}`

        let genero = await prisma.$queryRawUnsafe(sql)

        return genero

    } catch (error) {
        return false
    }

}

 const selecionarGeneros = async function(){

    let sql = 'select * from tbl_genero'

    let genero = await prisma.$queryRawUnsafe(sql)

    if (genero.length > 0){
    return genero
}
    else{
    return false
}
}

 const selecionarIdGenero = async function(id){
    try{
    let sql = `select * from tbl_genero where id= ${id}`
    let genero = await prisma.$queryRawUnsafe(sql)
    return genero
}
catch(error){
    return false
}}

module.exports = {
    inserirGenero,
    atualizarGenero,
    selecionarGeneros,
    selecionarIdGenero,
    deletarGenero
}
