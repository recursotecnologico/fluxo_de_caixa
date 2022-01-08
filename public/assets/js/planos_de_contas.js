const $_botao_cadastrar = document.querySelector('.botao_cadastrar');

const $_modal_planos_de_contas = document.querySelector('#modal_planos_de_contas');
const $_modal_planos_de_contas_acao = new bootstrap.Modal($_modal_planos_de_contas, { keyboard: true});
const $_modal_planos_de_contas_titulo = document.querySelector('#modal_planos_de_contas_titulo');


const $_formulario = document.querySelector('#formulario');
const $_input_plano_de_conta = document.querySelector('#input_plano_de_conta');
const $_input_plano_de_conta_operacional = document.querySelector('input[name="input_plano_de_conta_operacional"]:checked').value;


$_botao_cadastrar.addEventListener('click', ()=>{
    $_modal_planos_de_contas_acao.show();
    $_modal_planos_de_contas_titulo.innerHTML = 'Cadastrar';
})

$_formulario.addEventListener('submit', event=>{
    event.preventDefault();
    var input = {};
    input.plano_de_conta = $_input_plano_de_conta.value;
    input.plano_de_conta_operacional = document.querySelector('[name="input_plano_de_conta_operacional"]:checked').value;
    console.log(input);
})