var infoFilmes = require('../model/filmes.js')

const getListarTodosFilmes = () => {
    const filmes = infoFilmes.filmes.filmes

    let jsonFilmes = {}
    let arrayFilmes = []

    filmes.forEach((filme) => {

        let jsonFilmes = {

            nome: filme.nome,
            sinopse: filme.sinopse,
            duracao: filme.duracao,
            data_lancamento: filme.data_lancamento,
            data_relancamento: filme.data_relancamento,
            foto_capa: filme.foto_capa,
            valor_unitario: filme.valor_unitario

        }

        arrayFilmes.push(jsonFilmes)

    })

    jsonFilmes.filmes = arrayFilmes

    return jsonFilmes

}

const getDadosFilmes = (idFilme) => {
    const filmes = infoFilmes.filmes.filmes

    let jsonFilmes = {}
    let id = idFilme, 
    situacao = false

    filmes.forEach((filme) => {

        if (filme.id == id) {

            jsonFilmes = {

                id: filme.id,
                nome: filme.nome

            }

            situacao = true

        }
    })

    if (situacao) 
        return jsonFilmes
    else 
        return false
    
}

module.exports = {
    getListarTodosFilmes,
    getDadosFilmes
}