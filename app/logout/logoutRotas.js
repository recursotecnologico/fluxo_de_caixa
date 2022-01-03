module.exports = app =>{
    const auth = require('../app_autenticacao');
    app.get('logout', auth.cookie_logout);

    return app;
}