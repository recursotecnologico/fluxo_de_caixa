exports.randon = (tamanho)=>{
    var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L',
    'M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');

    //var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    //'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 
    //'0','1','2','3','4','5','6','7','8','9');

    let code = '';
    for (let i=0;i<tamanho;i++){
        code += alpha[Math.floor(Math.random() * alpha.length)];
    }
    return code;
}

exports.base64_encode = (texto)=>{
    const Base64 = require('nodejs-base64-converter');
    return Base64.encode(texto);
}

exports.base64_decode = (texto)=>{
    const Base64 = require('nodejs-base64-converter');
    return Base64.decode(texto);
}
