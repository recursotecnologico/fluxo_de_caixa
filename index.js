const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser')

//Config views engine
app.set('view engine', 'ejs');
app.set('views', __dirname+'/app')

app.use(express.static(__dirname+'/public'));
app.use(cookieParser())

//Cofig parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

require('./app/app_rotas')(app);
require('./api/api_v1_rotas')(app);

app.listen(PORT, console.log('Servidor rodando na porta: '+PORT));