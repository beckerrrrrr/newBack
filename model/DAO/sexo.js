const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

const selecionarIdSexo = async function(id){
    try{
    let sql = `select * from tbl_sexo where id= ${id}`
    let rsSexo = await prisma.$queryRawUnsafe(sql)
    return rsSexo
}
catch(error){
    return false
}}
module.exports = {
    selecionarIdSexo
}