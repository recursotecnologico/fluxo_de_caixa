exports.erros = (pg_erro)=>{
    console.log(pg_erro.code)
    var resposta = {
        status: 400,
        errors: []
    }
    var msg_parts = [];
    var conteudo = '';
    var obj = {message: ''};

    switch(pg_erro.code){
        case '42703':
            msg_parts = pg_erro.message.split(' ');
            conteudo = msg_parts[1].replace(/"/g,''); 
            obj = {
                message: 'A coluna \''+conteudo+'\' não existe na tabela' 
            }
            resposta.errors.push(obj);
            return resposta;
        break
        case '22P02':
            console.log(pg_erro.message)
            //invalid input syntax for type integer: "kk"
        break
        case '23505':
            msg_parts = pg_erro.detail.split(' ');
            msg_parts = msg_parts[1].split('=');
            var regex1 = /\(/g;
            var regex2 = /\)/g;
            msg_parts[1] = msg_parts[1].replace(regex1, ''); 
            conteudo = msg_parts[1].replace(regex2, ''); 
            obj.message = 'O valor \''+conteudo+'\' já existe e não pode ser duplicado';
            resposta.errors.push(obj);
            return resposta;
        break
        // case:
        // break
        // case:
        // break

        default:
            obj.message = pg_erro.message;
            obj.code = pg_erro.code;
            resposta.errors.push(obj);
        return resposta;

    }
}

exports.sucesso_insert = (tabela)=>{
    var resposta = {
        status: 200,
        message: 'Registro atualizado com sucesso',
        results: []
    }
    if(tabela == undefined){
        return resposta;
    }else{
        resposta.results = tabela
        return resposta;
    }
}
exports.sucesso_update = (tabela)=>{
    var resposta = {
        status: 200,
        message: 'Registro atualizado com sucesso',
        results: []
    }
    if(tabela == undefined){
        return resposta;
    }else{
        resposta.results = tabela
        return resposta;
    }
}