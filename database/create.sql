create table IF NOT EXISTS usuarios (
    usuario_id serial not null primary key,
    usuario varchar(30) not null unique,
    usuario_login varchar(30) not null,
    usuario_senha varchar(32) not null,
    usuario_salt varchar(8) not null,
    usuario_token varchar(32) not null unique,
    usuario_grupo varchar(10) not null
);

insert into usuarios 
    ( usuario, usuario_login, usuario_senha, usuario_salt, usuario_token, usuario_grupo) 
values
    ( 'Administrador', 'admin', 'cdfcbc3eedfb344053e91c8c1410aec7', 'SJt7K', 'cdfcbc3eedfb344053e91c8c1410aec7', 'admin' );


create table IF NOT EXISTS planos_de_contas(
    plano_de_conta_id serial not null primary key,
    plano_de_conta varchar(30) not null unique,
    plano_de_conta_operacional boolean not null,
    plano_de_conta_ativa boolean not null
);

insert into planos_de_contas 
    ( plano_de_conta, plano_de_conta_operacional, plano_de_conta_ativa ) 
values 
    ( 'Vendas ou Serviços / Trabalhos', true, true ),
    ( 'Administrativas / Moradia', true, true ),
    ( 'Empréstimos', false, true ),
    ( 'Investimentos', false, true );


create table IF NOT EXISTS movimentacoes(
    movimentacao_id serial not null primary key,
    movimentacao varchar(30) not null,
    movimentacao_tipo char(1) not null,
    movimentacao_mensal boolean not null,
    movimentacao_ativa boolean not null,
    movimentacao_fk_plano_de_conta int,
    CONSTRAINT movimentacao_fk_plano_de_conta 
        FOREIGN KEY(movimentacao_fk_plano_de_conta) 
        REFERENCES planos_de_contas(plano_de_conta_id)
);

insert into movimentacoes 
    (movimentacao, movimentacao_tipo, movimentacao_mensal, movimentacao_ativa, movimentacao_fk_plano_de_conta ) 
values 
    ( 'Trabalho Esposa', 'R', true, true, 1 ),
    ( 'Venda De Produto', 'R', true, true, 1 ),
    ( 'Conta de Luz', 'D', true, true, 2 ),
    ( 'Conta de Luz', 'D', true, true, 1 );




create table IF NOT EXISTS lancamentos(
    lancamento_id serial not null primary key,
    lancamento_data date not null,
    lancamento_fk_movimentacao int,
    lancamento_valor decimal(10,2) not null,
    lancamento_saldo decimal(10,2) not null,
    CONSTRAINT lancamento_fk_movimentacao 
        FOREIGN KEY(lancamento_fk_movimentacao) 
        REFERENCES movimentacoes(movimentacao_id)
);
