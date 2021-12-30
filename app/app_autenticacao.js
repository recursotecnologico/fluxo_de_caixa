exports.cookie = (req,res,next)=>{
    console.log(req);
    const cookie = req.cookie;
    //console.log(token);
    if(cookie == undefined){
        return res.redirect(301,'/login')
    }

    next();
}