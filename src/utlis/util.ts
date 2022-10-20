import axios from 'axios'
import { RESP_TYPE } from '../constants/common'
import Message from './message'
import qs from 'qs'

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
        if (response.data?.code === RESP_TYPE.SUCCESS){
            return response
        }
        else if (response.data?.code === RESP_TYPE.FAILURE){
            Message.error(response.data?.msg)
            return response
        } else {
            Message.error('服务器遇到点小问题，请过会再试哦^_^')
            return response
        }
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


export const axiosPostQs = <T> (url: string, data: T, proxy = '/api') => {
    let params = qs.stringify(data);
    return axios.post(`${proxy}${url}`, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

