exports.erros = (pg_erro)=>{
    console.log(pg_erro.code)
    var resposta = {
        status: 400,
        errors: []
    }
    switch(pg_erro.code){
        case '42703':
            var msg_parts = pg_erro.message.split(' ');
            var conteudo = msg_parts[1].replace(/"/g,''); 
            var obj = {
                message: 'A coluna \''+conteudo+'\' não existe na tabela' 
            }
            resposta.errors.push(obj);
            return resposta;
        break
        case '22P02':
            console.log(pg_erro.message)
            //invalid input syntax for type integer: "kk"
        break
        // case:
        // break
        // case:
        // break
        // case:
        // break

        default:

    }
}