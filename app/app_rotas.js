module.exports = app =>{

    const auth = require('./app_autenticacao');


    app.get('/', auth.cookie, (req,res)=>{
        res.render('views/home');
    })

    app.get('/login', (req,res)=>{
        res.render('views/login');
    })



    return app;
}