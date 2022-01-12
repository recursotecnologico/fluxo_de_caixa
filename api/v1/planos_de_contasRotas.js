module.exports = app=>{

    const auth = require('./api_v1_autenticacao');
    const msg = require('../../core/messageValidation');
    const { body, param, validationResult } = require('express-validator');

    const plano_de_conta = require('./planos_de_contasController');

    app.post('/api/v1/planos_de_contas',
        body('plano_de_conta')
            .exists()
            .withMessage(msg.obrigatorio_envio('plano_de_conta'))
            .notEmpty()
            .withMessage(msg.obrigatorio_preenchimento('plano_de_conta')),
        body('plano_de_conta_ativa')
            .exists()
            .withMessage(msg.obrigatorio_envio('plano_de_conta_ativa'))
            .isBoolean()
            .withMessage(msg.custom('O valor campo plano de conta ativa deve ser do tipo boolean.')),
            body('plano_de_conta_ativa')
            .exists()
            .withMessage(msg.obrigatorio_envio('plano_de_conta_ativa'))
            .notEmpty()
            .withMessage(msg.obrigatorio_preenchimento('plano de conta ativa'))
            .isBoolean()
            .withMessage(msg.custom('O valor campo plano de conta ativa deve ser do tipo boolean.')),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(msg.erros400(errors));
            }
            next();
        }, 
        auth.header, auth.user, plano_de_conta.cadastrar
    );

    app.get('/api/v1/planos_de_contas', auth.header, auth.user, plano_de_conta.listar);

    app.get('/api/v1/planos_de_contas/:id', 
        param('id')
            .exists()
            .withMessage(msg.obrigatorio_envio('id'))
            .notEmpty()
            .withMessage(msg.obrigatorio_preenchimento('id'))
            .isInt()
            .withMessage(msg.custom('O parâmetro id deve ser um número do tipo inteiro')),
            (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json(msg.erros400(errors));
                }
            next();
            }, 
        auth.header, auth.user, plano_de_conta.buscar
    );

    app.put('/api/v1/planos_de_contas/:id', 
    auth.header,
    param('id')
        .exists()
        .withMessage(msg.obrigatorio_envio('id'))
        .notEmpty()
        .withMessage(msg.obrigatorio_preenchimento('id'))
        .isInt()
        .withMessage(msg.custom('O parâmetro id deve ser um número do tipo inteiro')),
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
    body('plano_de_conta_ativa')
        .exists()
        .withMessage(msg.obrigatorio_envio('plano_de_conta_ativa'))
        .isBoolean()
        .withMessage(msg.custom('O valor campo plano de conta ativa deve ser do tipo boolean.')),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(msg.erros400(errors));
            }
        next();
        }, 
    auth.user, plano_de_conta.editar
);


    return app;
}