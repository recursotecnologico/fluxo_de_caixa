module.exports = app =>{
        
    app.get('/login', (req,res)=>{
        // console.log(req.body)
         res.render('login/views/login');
     })
     
     app.post('/login', async (req,res)=>{
        const db = require('../../core/postgresConnection');
        const crypto = require('crypto');
        const help = require('../../core/helpers');

        var sql = 'select * from usuarios where usuario_login = $1 LIMIT 1';
        var sql_args = [req.body.login];
        var sql_result = await db.query(sql, sql_args);
                
        //Se não existir nenhum usuário com esse login.
        if(sql_result.length < 1){
            var errors = [
                {message: 'Usuário não encontrado'}
            ]

            return res.render('login/views/login', {
                login: req.body.login,
                senha: req.body.senha,
                errors: errors
            });
        }

        //Converte tabela para objeto.
        var result = sql_result[0];

        //Gera um hash com a senha enviada e o salt_secret existente no banco de dados.
        const hash = crypto
            .createHmac('md5', result.usuario_salt)
            .update(req.body.senha)
            .digest('hex');
        
        //Se o hash gerado não coincide com o hash cadastrado.
        if(hash != result.usuario_senha){
            var errors = [
                {message: 'Usuário não encontrado'}
            ]
            return res.render('login/views/login', {
                login: req.body.login,
                senha: req.body.senha,
                errors: errors
            });
        }
       
        const novo_token = crypto
            .createHmac('md5', help.randon(8))
            .update(Date.now().toString())
            .digest('hex');
        
        //Atualiza o novo token no banco de dados.
        sql = 'update usuarios set usuario_token = $1 where usuario_id = $2';
        sql_args = [novo_token, result.usuario_id];    
        sql_result = await db.query(sql, sql_args);

        res.cookie('token', novo_token);
        return res.redirect(301,'/');
     })

    return app;
}