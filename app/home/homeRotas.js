module.exports = app =>{

    const auth = require('../app_autenticacao');

    app.get('/', auth.cookie, (req,res)=>{
        res.render('home/views/home');
    })

    return app;
}