exports.cookie = (req,res,next)=>{
    const cookie = req.headers.cookie;
    if(cookie == undefined){
        return res.redirect(301,'/login')
    }
    next();
}
exports.cookie_logout = (req,res)=>{
    req.clearCookie('token');
    return res.redirect(301, '/');
}