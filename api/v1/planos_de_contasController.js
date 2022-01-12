exports.cadastrar = async (req,res)=>{
    
        console.log(req.body);
        console.log(res.locals)

        return res.json({message: 'Cadastro realizado com sucesso'});
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
    
}

exports.delatar = async (req,res)=>{
    
}