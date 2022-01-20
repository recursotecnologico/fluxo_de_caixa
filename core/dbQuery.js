class Db{
    constructor(){
        this.db = require('./postgresConnection');
        this.sql = '';
    }
    async get(tabela, args){
        
        if((tabela == undefined) && (args == undefined)){
            let sql = 'select * from '+this.sql;
            return await this.db.query(sql).catch(err=>(err));

        }else if(args == undefined){
            let sql = 'select * from '+tabela;
            return await this.db.query(sql).catch(err=>(err));
        }else{
            let sql = tabela;
            return await this.db.query(sql, args).catch(err=>(err));
        }
        
        
        
    //     if(args != undefined){
    //         this.sql = tabela;
    //         return await this.db.query(this.sql, args).catch(err=>(err));
        
    //     }else{

    //         this.sql = 'select * from '+tabela;
    //         return await this.db.query(this.sql).catch(err=>(err));
    //    }
    }


    async custom(sql, args){
        return await this.db.query(sql, args).catch(err=>(err));
    } 
}

module.exports = new Db;