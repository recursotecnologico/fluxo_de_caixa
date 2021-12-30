exports.login = async (req, res)=>{

    console.log(req.body)
    var time = Date.now();
    const user = {
        usuario: 'admin',
        token: time
    }
    res.json(user);


}