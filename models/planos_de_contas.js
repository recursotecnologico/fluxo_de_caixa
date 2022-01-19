class Planos_de_contas{
    constructor(){
        this.db = require('../core/postgresConnection');
    }
    async get(){

        const result = this.db
        .query('select * from planos_de_contas order by plano_de_conta_ativa DESC, plano_de_conta')
        .catch(err=>(err));
        return result;
    }
    
};

module.exports = new Planos_de_contas();