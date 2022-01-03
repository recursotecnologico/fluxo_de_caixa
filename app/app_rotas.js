module.exports = app =>{

    require('./home/homeRotas')(app);
    require('./login/loginRotas')(app);
    return app;
}