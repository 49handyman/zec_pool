import http from './http'

const ajax = (url,data={},method='GET') => {
    return new Promise((resolve,reject) => {
        let promise;
        if(method.toUpperCase() === 'GET') {
            promise = http.get(url,{
                params:data
            })
        }else if(method.toUpperCase() === 'POST') {
            promise = http.post(url,data)
        }
        promise.then(res => {
            resolve(res.data)
        }).catch(error => reject(error))
    })
}

export default ajax;