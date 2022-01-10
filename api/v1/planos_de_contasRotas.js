module.exports = app=>{

    const auth = require('./api_v1_autenticacao');


    app.post('/api/v1/planos_de_contas', auth.header , auth.user, async (req,res)=>{
        console.log(req.body);
        console.log(res.locals)

        return res.json({message: 'Cadastro realizado com sucesso'});
    })

    return app;
}