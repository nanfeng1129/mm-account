import axios from 'axios'
import { RESP_TYPE } from '../constants/common'
import Message from './message'
import qs from 'qs'
import { useLoginStore } from '@/stores/user'
import router from '@/router'

const store = useLoginStore()

axios.interceptors.request.use(
    ( config ) => {
        return config
    }, 
    ( err ) => {
        return Promise.reject(err)
    }
)

axios.interceptors.response.use(
    ( response ) => {
        if (response.data?.code === RESP_TYPE.LOGIN_EXPIRED) {
            if (store.isLogin)
                Message.error(response.data?.msg ?? '未知错误');
            store.changeIsLogin(false)
            router.push("/")
        } else if (response.data?.code === RESP_TYPE.FAILURE){
            Message.error(response.data?.msg ?? '未知错误')
        } else {
            Message.error('服务器遇到点小问题，请过会再试哦^_^')
        }
        return response
    },
    ( error ) => {
        const { response } = error
        const { status } = response
        switch ( status ){
            case 404:
                Message.error("404 Not Found!");
                break;
            case 401:
                Message.error("登录已过期，请重新登录哦！");
                break;
            case 500:
                Message.error("服务器遇到点小问题，请过会再试哦^_^");
                break;
            case 502:
                Message.error("服务器遇到点小问题，请过会再试哦^_^");
                break;
        }
        return error?.response
    }
)


export const axiosPostQs = (url: string, data = {}, proxy = '/api') => {
    let params = qs.stringify(data);
    return axios.post(`${proxy}${url}`, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export const axiosPostJson = (url: string, data = {}, proxy = '/api') => {
    return axios.post(`${proxy}${url}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

