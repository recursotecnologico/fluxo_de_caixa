module.exports = app =>{

    const auth = require('./app_autenticacao');

    require('./login/loginRotas')(app);

    app.get('/', auth.cookie, auth.user, (req,res)=>{ 
        //console.log(res.locals.usuario)
        res.render('views/home');
    })

    app.get('logout', auth.cookie_logout);

    app.get('/planos_de_contas', (req,res,next)=>{
        console.log('Chegou plano de contas');
        next();
    }, auth.cookie, auth.user, async (req,res)=>{
        const db = require('../core/dbQuery');
        const result = await db.get('planos_de_contas');
        const Plano_de_conta = require('../models/planos_de_contas');
        const tabela = await Plano_de_conta.get();
        console.log(tabela)

        return res.render('views/planos_de_contas', {
            scripts_css: ['/assets/css/kdekdek.css'],
            scripts_js: ['/assets/js/planos_de_contas.js'],
            planos_de_contas: tabela
        });
    });


    
    return app;
}