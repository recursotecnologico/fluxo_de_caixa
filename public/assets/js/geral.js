const $_navegacao_btn_menu = document.querySelector('.navegacao_btn_menu');
const $_menu_lateral = document.querySelector('.menu_lateral');
const $_menu_lateral_pano_de_fundo = document.querySelector('.menu_lateral_pano_de_fundo');



$_navegacao_btn_menu.addEventListener('click', ()=>{
    menu_lateral_open_close();
})
$_menu_lateral_pano_de_fundo.addEventListener('click', ()=>{
    menu_lateral_open_close();
})

function menu_lateral_open_close(){
    if($_menu_lateral.classList.contains('open')){
        $_menu_lateral.classList = $_menu_lateral.classList.value.replace(' open', '');
        $_menu_lateral_pano_de_fundo.classList = $_menu_lateral_pano_de_fundo.classList.value.replace(' open', '');

    }else{
        $_menu_lateral.classList = $_menu_lateral.classList.value + ' open';
        $_menu_lateral_pano_de_fundo.classList = $_menu_lateral_pano_de_fundo.classList.value + ' open';
    }
};

//console.log($_menu_lateral_pano_de_fundo)