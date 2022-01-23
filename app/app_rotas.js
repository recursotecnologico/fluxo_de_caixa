module.exports = app =>{

    const auth = require('./app_autenticacao');

    require('./login/loginRotas')(app);

    app.get('/', auth.cookie, auth.user, (req,res)=>{ 
        //console.log(res.locals.usuario)
        res.render('views/home');
    })

    app.get('logout', auth.cookie_logout);

    app.get('/planos_de_contas', 
        auth.cookie, 
        auth.user, 
        async (req,res)=>{
            const Plano_de_conta = require('../models/planos_de_contasModel');
            const tabela = await Plano_de_conta.get();
            return res.render('views/planos_de_contas', {
                scripts_css: [],
                scripts_js: ['/assets/js/planos_de_contas.js'],
                planos_de_contas: tabela
            });
        }
    );

    app.get('/movimentacoes', 
        auth.cookie, 
        auth.user, 
        async (req,res)=>{
            console.log('Chegou controller movimentações')
            const Model = require('../models/movimentacoesModel');
            const tabela = await Model.get();
            return res.render('views/movimentacoes', {
                scripts_css: [],
                scripts_js: ['/assets/js/movimentacoes.js'],
                tabela: tabela
            });
        }
    );

    
    return app;
}