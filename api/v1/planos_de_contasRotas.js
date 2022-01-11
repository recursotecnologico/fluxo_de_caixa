module.exports = app=>{

    const auth = require('./api_v1_autenticacao');
    const msg = require('../../core/messageValidation');
    const { body, validationResult } = require('express-validator');

    app.post('/api/v1/planos_de_contas', 
        auth.header, 
        auth.user,
        (req, res, next)=>{
            console.log(req.body)
            next();
        },
        body('plano_de_conta')
            .exists()
            .withMessage(msg.obrigatorio_envio('plano_de_conta'))
            .notEmpty()
            .withMessage(msg.obrigatorio_preenchimento('plano_de_conta')),
        body('plano_de_conta_operacional')
            .exists()
            .withMessage(msg.obrigatorio_envio('plano_de_conta_operacional'))
            .isBoolean()
            .withMessage(msg.custom('O valor campo plano de conta operacional deve ser do tipo boolean.')),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(msg.erros400(errors));
            }
            next();
        },
        async (req,res)=>{
        console.log(req.body);
        console.log(res.locals)

        return res.json({message: 'Cadastro realizado com sucesso'});
    })

    return app;
}