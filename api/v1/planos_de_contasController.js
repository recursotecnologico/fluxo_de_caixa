exports.cadastrar = async (req,res)=>{
    const pg_message = require('../../core/postgresMessages');
    const Model = require('../../models/planos_de_contas');

    var sql_args = [ 
        req.body.plano_de_conta, 
        req.body.plano_de_conta_operacional, 
        req.body.plano_de_conta_ativa
    ];
    var sql_result = await Model.post(sql_args);

    if(!Array.isArray(sql_result)){
        return res.status(400).json(pg_message.erros(sql_result));
    }
    return res.json(pg_message.sucesso_insert(await Model.get()));
}

exports.listar = async (req,res)=>{
    const Plano_de_conta = require('../../models/planos_de_contas');
    res.json(await Plano_de_conta.get())
}

exports.buscar = async (req,res)=>{
    const Planos = require('../../models/planos_de_contas');
    const pg_message = require('../../core/postgresMessages');

    var sql_result = await Planos.find([req.params.id, 1]);
    if(!Array.isArray(sql_result)){
        return res.status(400).json(pg_message.erros(sql_result));
    }
    res.json(pg_message.sucesso_select(sql_result))
}

exports.editar = async (req,res)=>{
    const pg_message = require('../../core/postgresMessages');
    const Planos = require('../../models/planos_de_contas');
    var sql_args = [ 
        req.body.plano_de_conta, 
        req.body.plano_de_conta_operacional, 
        req.body.plano_de_conta_ativa,
        req.params.id
    ];

    var sql_result = await Planos.put(sql_args);
    if(!Array.isArray(sql_result)){
        return res.status(400).json(pg_message.erros(sql_result));
    }
    if(sql_result.length == '0'){
        return res.status(400).json(
            pg_message.errosCustom400('Registro não encontrado.')
        );
    };
   
    return res.json(pg_message.sucesso_update(await Planos.get()));
}

exports.deletar = async (req,res)=>{
    const Planos = require('../../models/planos_de_contas');
    const pg_message = require('../../core/postgresMessages');

    var sql_result = await Planos.delete([req.params.id]);
    if(!Array.isArray(sql_result)){
        return res.status(400).json(pg_message.erros(sql_result));
    }
    //Se não existia o registro.
    if(sql_result.length == '0'){
        return res.status(400).json(
            pg_message.errosCustom400('Registro não encontrado.')
        );
    };
    return res.json(pg_message.sucesso_delete(await Planos.get()));
}