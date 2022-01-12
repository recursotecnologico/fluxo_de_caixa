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

app.use(function(err, req, res, next) {
    console.log(err)
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      // Handle the error here
      console.error('Bad JSON');
      var erro = {status: 400, errors: [{message: 'Erro na formatação do JSON'}]}
      res.status(400).json(erro);
    }
    
    // Pass the error to the next middleware if it wasn't a JSON parse error
    //next(err)
    next()
  });

require('./app/app_rotas')(app);
require('./api/api_v1_rotas')(app);


app.get('*', (req,res)=>{
  return res.send('404');
})

app.listen(PORT, console.log('Servidor rodando na porta: '+PORT));