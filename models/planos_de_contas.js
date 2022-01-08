class Planos_de_contas{
    constructor(){

        this.db = require('../core/postgresConnection');
    }
    
};

module.exports = new Planos_de_contas();