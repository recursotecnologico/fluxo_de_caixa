module.exports = app =>{
    const login = require('./loginController');        
    const { body, validationResult } = require('express-validator');
    const msg = require('../../core/messageValidation');
    
    app.get('/login', login.index);

    app.post('/login',
        body('login')
            .exists().withMessage(msg.obrigatorio_envio('login'))
            .notEmpty().withMessage(msg.obrigatorio_preenchimento('login')),

        body('senha')
            .exists().withMessage(msg.obrigatorio_envio('senha'))
            .notEmpty().withMessage(msg.obrigatorio_preenchimento('senha'))
            .isLength({ min: 5, max: 12 }).withMessage(msg.tamanho_entre('senha', 5, 12)),
            
        (req, res, next) => {
            const errors = validationResult(req);
            const resp = msg.erros400(errors);
            if (!errors.isEmpty()) {
                return res.render('login/views/login', {
                    login: req.body.login,
                    senha: req.body.senha,
                    errors: resp.errors
                });
            }
            next();
        }, 
    login.logar);

    return app;
}