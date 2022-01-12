exports.cadastrar = async (req,res)=>{
    const db = require('../../core/dbQuery');
    const pg_message = require('../../core/postgresMessages');
    var sql = 'insert into planos_de_contas '+
    '(plano_de_conta, plano_de_conta_operacional, plano_de_conta_ativa) '+
    'values ($1, $2, $3)';
    var sql_args = [ 
        req.body.plano_de_conta, 
        req.body.plano_de_conta_operacional, 
        req.body.plano_de_conta_ativa
    ];
    var sql_result = await db.custom(sql, sql_args);
    if(!Array.isArray(sql_result)){
        return res.json(pg_message.erros(sql_result));
    }
    sql = 'select * from planos_de_contas';
    sql_result = await db.custom(sql);
    return res.json(pg_message.sucesso_insert(sql_result));
}

exports.listar = async (req,res)=>{
        const db = require('../../core/dbQuery');
        var sql = 'select * from planos_de_contas';
        var sql_result = await db.custom(sql);
        res.json(sql_result)
    
}
exports.buscar = async (req,res)=>{
    const db = require('../../core/dbQuery');
    const pg_message = require('../../core/postgresMessages');
    var sql = 'select * from planos_de_contas where plano_de_conta_id = $1 LIMIT 1';
    var sql_args = [req.params.id]
    var sql_result = await db.custom(sql, sql_args);
    if(!Array.isArray(sql_result)){
        //console.log(sql_result);
        return res.status(400).json(pg_message.erros(sql_result));
    }
    res.json(sql_result)
        
}

exports.editar = async (req,res)=>{
    const db = require('../../core/dbQuery');
    const pg_message = require('../../core/postgresMessages');
    var sql = 'update planos_de_contas set '+
    'plano_de_conta = $1, plano_de_conta_operacional = $2, plano_de_conta_ativa = $3 where plano_de_conta_id = $4';
    var sql_args = [ 
        req.body.plano_de_conta, 
        req.body.plano_de_conta_operacional, 
        req.body.plano_de_conta_ativa,
        req.params.id
    ];
    var sql_result = await db.custom(sql, sql_args);
    if(!Array.isArray(sql_result)){
        return res.json(pg_message.erros(sql_result));
    }
    sql = 'select * from planos_de_contas';
    sql_result = await db.custom(sql);
    return res.json(pg_message.sucesso_update(sql_result));
}

exports.delatar = async (req,res)=>{
    
}