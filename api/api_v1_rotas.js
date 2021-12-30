module.exports = app=>{
    const auth = require('./v1/api_v1_autenticacao');
    app.post('/api/v1/autenticacao/login', auth.login);


    return app;
}