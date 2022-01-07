module.exports = app =>{

    const auth = require('./app_autenticacao');
    require('./login/loginRotas')(app);

    app.get('/', auth.cookie, (req,res)=>{
        res.render('views/home');
    })

    app.get('logout', auth.cookie_logout);

    app.get('/planos_de_contas', async (req,res)=>{
        return res.render('views/planos_de_contas');
    });


    
    app.get('*', (req,res)=>{
        return res.send('404');
    })
    return app;
}