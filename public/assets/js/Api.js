class Api{
    constructor(url_base){
        this.url_base = url_base;    
        this.url = '';
        this.headers = {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    }
    async post(recurso, input){
        this.url = this.url_base+recurso;
        return await fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(input)
        }).catch(err=>(err));
    }
}