const $_page_message = document.querySelector('#page_message');
const $_botao_cadastrar = document.querySelector('.botao_cadastrar');

const $_modal_planos_de_contas = document.querySelector('#modal_planos_de_contas');
const $_modal_planos_de_contas_acao = new bootstrap.Modal($_modal_planos_de_contas, { keyboard: true});
const $_modal_planos_de_contas_titulo = document.querySelector('#modal_planos_de_contas_titulo');
const $_modal_mensagem = document.querySelector('#modal_mensagem');

const $_formulario = document.querySelector('#formulario');
const $_formulario_botao_enviar = document.querySelector('#formulario_botao_enviar');
const $_input_plano_de_conta_id = document.querySelector('#input_plano_de_conta_id');
const $_input_plano_de_conta = document.querySelector('#input_plano_de_conta');
const $_input_plano_de_conta_operacional = document.querySelector('#input_plano_de_conta_operacional');

const $_input_plano_de_conta_ativa = document.querySelector('#input_plano_de_conta_ativa');

const $_tabela_plano_de_conta = document.querySelector('#tabela_plano_de_conta');
var planos_de_contas = [];


$_botao_cadastrar.addEventListener('click', ()=>{
    $_modal_planos_de_contas_acao.show();
    $_modal_planos_de_contas_titulo.innerHTML = 'Cadastrar';
    $_input_plano_de_conta.value = '';
    $_formulario_botao_enviar.value = 'cadastrar';
})

$_formulario.addEventListener('submit', async event=>{
    event.preventDefault();
    var input = {};
    
    input.plano_de_conta = $_input_plano_de_conta.value;
    input.plano_de_conta_operacional = $_input_plano_de_conta_operacional.checked;
    input.plano_de_conta_ativa = $_input_plano_de_conta_ativa.checked;

    var api = new Api('/api/v1/');
    api.setToken(decodeTokenDoCookie());
    var api_response = '';
    var api_result = '';
    if($_formulario_botao_enviar.value == 'cadastrar'){
        api_response = await api.post('planos_de_contas', input);
    }else{
        input.plano_de_conta_id = $_input_plano_de_conta_id.value;
        api_response = await api.put('planos_de_contas/'+input.plano_de_conta_id, input);
    }
    api_result = await api_response.json();
    switch(api_response.status){
        case 400:
            $_modal_mensagem.innerHTML = messagesAlert('danger', api_result.errors);            
        break
        case 404:
            console.log('Rota não existe no servidor ou esta incorreta');
        break
        case 200: 
            $_modal_planos_de_contas_acao.hide();
            $_page_message.innerHTML = messagesAlert('success', api_result.message);    
            planos_de_contas = api_result.results;
            renderTable();
        break
        default:
            console.log(await api_response.json());
    }
})

$_tabela_plano_de_conta.addEventListener('click', event=>{

    const linhaClicada = event.target.parentNode;

    $_input_plano_de_conta_id.value = parseInt(linhaClicada.getAttribute('data-id'));
    $_input_plano_de_conta.value = linhaClicada.cells[0].innerHTML;
    $_input_plano_de_conta_operacional.checked = (linhaClicada.getAttribute('data-operacional') == 'true') ?  true :  false;
    $_input_plano_de_conta_ativa.checked = ( linhaClicada.getAttribute('data-operacional') == 'true') ?  true :  false;

    $_formulario_botao_enviar.value = 'editar';
    $_modal_planos_de_contas_acao.show();

})


function renderTable(){
    var linhas = '';
    console.log(planos_de_contas)
    planos_de_contas.forEach(item=>{
        linhas += '<tr '+
                'data-id="'+ item.plano_de_conta_id +' "'+ 
                'data-operacional="'+ item.plano_de_conta_operacional+' "'+
                'data-ativa="'+ item.plano_de_conta_ativa+' ">';
            if(item.plano_de_conta_operacional == true){
                linhas += '<td> '+ item.plano_de_conta+'</td><td class="text-primary text-center fw-bold ">Sim</td>';
            }else{
                linhas += '<td>'+ item.plano_de_conta+'</td><td class="text-danger text-center fw-bold">Não</td>';
            }
        linhas += '</tr>';
    })
    $_tabela_plano_de_conta.innerHTML = linhas;
}



