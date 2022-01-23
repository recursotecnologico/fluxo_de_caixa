exports.cookie = (req,res,next)=>{
    const cookie = req.headers.cookie;
    //console.log(req.headers.cookie);
    console.log('Chegou no middware cookie login');
    if(cookie == undefined){
        console.log('Cookie login redirecionou para: /login')
        return res.redirect(301,'/login')
    }
    console.log('Possui cookie na requisição');
    console.log('Saiu do middware cookie login');
    next();
}
exports.cookie_logout = (req,res)=>{
    req.clearCookie('token');
    return res.redirect(301, '/');
}
exports.user = async (req,res, next)=>{
    
    const help = require('../core/helpers');
    const token64 = req.cookies.token;
    const db = require('../core/dbQuery');
    if(token64 == undefined){
        console.log('Não possui o cookie com chave tohen');
        console.log('Está sendo redirecionado para: /login')

        return res.redirect(301, '/login');
    }
    console.log(token64)
    var user_string = help.base64_decode(token64);
    var user = JSON.parse(user_string);
    
    console.log(user)
    
    var sql = 'select * from usuarios where usuario_token = $1 LIMIT 1';
    var sql_args = [user.token];
    var sql_result = await db.custom(sql, sql_args);
    console.log('Buscou o token no banco de dados.')   
    if(sql_result.length < 1){
        console.log('Token não confere com nenhum no banco de dados.')
        console.log('Não passou na autenticação do usuário, redirecionado para: /login')

        return res.redirect(301, '/login');
    }


    console.log('Token existente no banco de dados;');
    console.log('Passou na autenticação do usuário');
    res.locals.usuario = sql_result[0];
    
    // res.local = {
    //     usuario: sql_result[0]
    // };
    
    //console.log(sql_result[0])
    next()
}