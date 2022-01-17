class Api{
    constructor(url_base){
        this.url_base = url_base;    
        this.url = '';
        this.headers = {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            Authorization: ''
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
    async put(recurso, input){
        this.url = this.url_base+recurso;
        return await fetch(this.url, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(input)
        }).catch(err=>(err));
    }
    setToken(token){
        this.headers.Authorization = 'Bearer '+token;
    }
}