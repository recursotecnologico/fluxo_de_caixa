exports.cookie = (req,res,next)=>{
    const cookie = req.headers.cookie;
    //console.log(req.headers.cookie);
    if(cookie == undefined){
        return res.redirect(301,'/login')
    }
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
        return res.redirect(301, '/');
    }
    console.log(token64)
    var user_string = help.base64_decode(token64);
    var user = JSON.parse(user_string);
    //console.log(user)
    var sql = 'select * from usuarios where usuario_token = $1 LIMIT 1';
    var sql_args = [user.token];
    var sql_result = await db.custom(sql, sql_args);
    
    if(sql_result.length < 1){
        return res.redirect(301, '/');
    }
    
    res.locals.usuario = sql_result[0];
    
    // res.local = {
    //     usuario: sql_result[0]
    // };
    
    //console.log(sql_result[0])
    next()
}