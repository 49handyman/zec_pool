import axios from 'axios'
import vue from 'vue'
// import router from '@/router/index'

const http = axios.create({
    baseURL: ''
})

//添加axios request 拦截器
http.interceptors.request.use((config) => {
    //添加langType请求头
    config.headers.langType = 1
    return config
},error => {
    return Promise.reject(error)
})


//添加一个axios response 拦截器
http.interceptors.response.use(res => {
    if(res.data.code !== 0) {
        vue.prototype.$toast.fail(res.data.message)
    }
    return res
}, error => {
    // debugger
    // if(error.response.status === 401 || error.response.status === 402){
    //     router.push('/login')
    // }
    // Message.error(error.response.data.msg)

    return Promise.reject(error)
})
export default http
