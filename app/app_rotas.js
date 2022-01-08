module.exports = app =>{

    const auth = require('./app_autenticacao');

    require('./login/loginRotas')(app);

    app.get('/', auth.cookie, (req,res)=>{
        res.render('views/home');
    })

    app.get('logout', auth.cookie_logout);

    app.get('/planos_de_contas', async (req,res)=>{
        const db = require('../core/dbQuery');
        const result = await db.get('planos_de_contas');

        return res.render('views/planos_de_contas', {
            scripts_css: ['/assets/css/kdekdek.css'],
            scripts_js: ['/assets/js/planos_de_contas.js'],
            planos_de_contas: result
        });
    });


    
    app.get('*', (req,res)=>{
        return res.send('404');
    })
    return app;
}