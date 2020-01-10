import axios from "axios"

var HttpRequest = {
    getRequest({url,data={},method="GET"}){
        return new Promise((resolve,reject)=>{
            this._getRequest(url,resolve,reject,data,method);
        })
    },
    _getRequest:function(url,resolve,reject,data={},method="GET"){
        let format = method.toLocaleLowerCase() ==='get'?'params':'data';
        axios({
            url:url,
            method:method,
            [format]:data,
            header:{
                "content-type":"application/json"
            }
        }).then(res => {
            if(res.code == 0){
                resolve(res);
            } else if(res.code == 1){
                resolve(res);
            }
        }).catch(()=>{
            reject();
            console.log('发生错误');
        })
    }
}

export{
    HttpRequest
};