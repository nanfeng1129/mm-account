import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { axiosPostJson } from '@/utlis/util'
import { RESP_TYPE } from '@/constants/common'
import Message from '@/utlis/message'
import { useLoginStore } from '@/stores/user'
import router from '@/router'

interface User {
    username: string,
    password: string,
    email?: string
}

export const useModal = () => {
    const visible = ref(false)

    const changeVisible = (boo: boolean) => {
        visible.value = boo
    }

    const handleOk = (el: FormInstance | undefined, data: User, cb: Function) =>{ 
        cb(el, data, changeVisible)
    }

    return {
        visible,
        handleOk,
        changeVisible
    }

}

export const useForm = () => {

    const loginForm = ref()

    const formData = reactive<User>({
        username: '',
        password: '',
        email: '',
    })

    const rules = reactive<FormRules>({
        username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { pattern: /^\w+$/, message: '请输入正确账号' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { 
                validator: (rule: any, value: any, callback: any) => {
                    if(value.length < 6){
                        callback(new Error('请输入正确密码'))
                    }
                    for(let i = 0; i < value.length; i++){
                        if(!/^[\u0000-\u00ff]$/.test(value.charAt(i))){
                            callback(new Error('密码中含有中文字符'))
                        }
                    }
                    callback()
                    // else if(/^[\u0000-\u00ff]$/.test(val))
                }, 
                trigger: 'blur' 
            }
        ],
        email: [
            { type: 'email', message: '请输入正确邮箱', trigger: 'blur' }
        ],
    })

    const onSubmit = async (formEl: FormInstance | undefined, user: User, changeVisible: Function) => {
        if(!formEl) return;
        const store = useLoginStore()
        await formEl.validate((valid, fields) => {
            if(valid) {
                axiosPostJson('/user/login', user).then((res: any) => {
                    if(res.data.code === RESP_TYPE.SUCCESS) {
                        Message.success("登录成功")
                        sessionStorage.setItem("token", res.data.data)
                        store.changeIsLogin(true)
                        changeVisible(false)
                    }
                })
            }else{
                console.log("error Submit", fields)
            }
        })
    }

    //重置表单
    const handleReset = (formEl: FormInstance | undefined) => {
        if(!formEl) return;
        formEl.resetFields()
    }

    return {
        loginForm,
        formData,
        rules,
        onSubmit,
        handleReset,
    }

}

export const useAvatar = () => {
    const avatarSrc = ref('https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')

    return {
        avatarSrc
    }
}

export const useAfterLogin = () => {
    const store = useLoginStore()

    const jumpToMyCenter = () => {
        
        if(store.isLogin) {
            router.push("/myCenter")
        }
    }
    const logout = () => {
        axiosPostJson("/user/logout").then(res => {
            if(res.data?.code === RESP_TYPE.SUCCESS) {
                Message.success("退出登录成功")
                store.changeIsLogin(false)
            }
        })
    }

    return {
        jumpToMyCenter,
        logout
    }
}

