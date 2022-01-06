const db = require('./core/postgresConnection');


var sql = '';
var sql_result = '';
var tabelas = [];

init();
async function init(){
    sql = "select tablename as tabela from pg_catalog.pg_tables where schemaname not in ('pg_catalog', 'information_schema')";
    tabelas = await db.query(sql);
    //console.table(tabelas);
    delete_tabelas();

}


//Remove todas as tabelas.
async function delete_tabelas(){
    var erro = false;
    console.log('Número de tabelas: '+tabelas.length);
    sql = 'drop table IF EXISTS';
    tabelas.forEach(async item=>{
        console.log('Removendo a tebela: '+item.tabela);
        sql_result = await db.query(sql+' '+item.tabela+ ' CASCADE').catch(err=>(err));
        //console.log(sql_result);
        if(!Array.isArray(sql_result)){
            console.log('A tabela '+item.tabela+' NÃO foi removida com sucesso.');
            erro = true;
        }else{
            console.log('A tabela '+item.tabela+' foi removida com sucesso.');
        }
        if(erro == true){
            delete_tabelas();
        }else{
            //console.log('Tabelas removidas com sucesso;');
            return true;
        }
    })
};
