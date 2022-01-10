exports.login = async (req, res)=>{

    console.log(req.body)
    var time = Date.now();
    const user = {
        usuario: 'admin',
        token: time
    }
    res.json(user);
}
exports.header = (req,res,next)=>{
    var authorizacao = req.headers.authorization;
    var autorizacao_partes = '';
    if(authorizacao == undefined){
        return res.status(301).json({message: 'Cliente não autorizado'});
    }
    
    autorizacao_partes = authorizacao.split(' ');
    if(autorizacao_partes.length != 2){
        return res.status(301).json({message: 'Autorização com formato incorreto'});
    }
    if(autorizacao_partes[0] != 'Bearer'){
        return res.status(301).json({message: 'Autorização não possui o formato Bearer correto'});
    }

    res.locals.token = autorizacao_partes[1]; 
    next();
}

exports.user = async (req,res,next)=>{
    const db = require('../../core/dbQuery');
    const sql = 'select * from usuarios where usuario_token = $1 LIMIT 1';
    const sql_args = [res.locals.token];
    const sql_result = await db.custom(sql, sql_args);

    if(sql_result.length < 1){
        return res.status(301).json({message: 'Cliente não autorizado'});
    }
    // var x = {...res.locals}
    // console.log(x)
    res.locals = sql_result[0];
    next();
}















