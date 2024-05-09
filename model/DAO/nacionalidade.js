const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();


const selecionarId = async function(id){
    try{
    let sql = `select * from tbl_nacionalidade where id= ${id}`
    //let sql = `select * from tbl_ator_nacionalidade where id= ${id}`
    let rsNacionalidade = await prisma.$queryRawUnsafe(sql)
    return rsNacionalidade
}
catch(error){
    return false
}}
module.exports = {
    selecionarId
}