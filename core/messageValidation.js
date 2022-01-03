exports.obrigatorio_envio = (campo)=>{
    return 'O campo '+campo+' é de envio obrigatório';
}
exports.obrigatorio_preenchimento = (campo)=>{
    return 'O campo '+campo+' é de preenchimento obrigatório';
}
exports.custom = (msg)=>{
    return msg;
}
exports.tamanho_maximo = (campo, tamanho)=>{
    return 'O campo '+campo+' deve possuir no maximo '+tamanho+' caracters';
}
exports.tamanho_minimo = (campo, tamanho)=>{
    return 'O campo '+campo+' deve possuir no minimo '+tamanho+' caracters';
}
exports.tamanho_entre = (campo, minimo, maximo)=>{
    return 'O campo '+campo+' deve possuir entre '+minimo+' e '+maximo+' caracters';
}
exports.erros400 = (errors)=>{
    var resposta = {};
    resposta.status = 400;
    resposta.errors = errors.array().map(item=>{
        var obj = {};
        obj.message = item.msg;
        return obj;
    });
    return resposta;
}