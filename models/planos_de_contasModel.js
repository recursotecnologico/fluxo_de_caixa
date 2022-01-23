class Planos_de_contas{
    constructor(){
        this.db = require('../core/postgresConnection');
    }
    async get(){

        const result = this.db
        .query('select * from planos_de_contas order by '+
        'plano_de_conta_ativa DESC, plano_de_conta_operacional DESC, plano_de_conta')
        .catch(err=>(err));
        return result;
    }
    async post(args){
        var sql = 'insert into planos_de_contas '+
        '(plano_de_conta, plano_de_conta_operacional, plano_de_conta_ativa) '+
        'values ($1, $2, $3)';
        return await this.db.query(sql, args).catch(err=>(err));
    }
    async find(id, limit){
        let sql = '';
        if(limit != undefined){
            sql = 'select * from planos_de_contas where plano_de_conta_id = $1 LIMIT $2';
            return await this.db.query(sql, [id, limit]).catch(err=>(err));
        }
        sql = 'select * from planos_de_contas where plano_de_conta_id = $1';
        return await this.db.query(sql, [id]).catch(err=>(err));

    }
    async put(args){
        var sql = 'update planos_de_contas set '+
        'plano_de_conta = $1, plano_de_conta_operacional = $2, plano_de_conta_ativa = $3 where plano_de_conta_id = $4 RETURNING *';
        return await this.db.query(sql, args).catch(err=>(err));
    }
    async delete(args){
        var sql = 'delete from planos_de_contas where plano_de_conta_id = $1 RETURNING *';
        return await this.db.query(sql, args).catch(err=>(err));
    }
    
};

module.exports = new Planos_de_contas();