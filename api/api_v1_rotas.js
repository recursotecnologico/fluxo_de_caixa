module.exports = app=>{
    const auth = require('./v1/api_v1_autenticacao');
    app.post('/api/v1/autenticacao/login', auth.login);

    require('./v1/planos_de_contasRotas')(app);

    return app;
}