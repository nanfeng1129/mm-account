import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
// import 

interface User {
    userName: string,
    password: string,
    email: string
}

export const useModal = () => {
    const visible = ref(false)

    const changeVisible = (boo: boolean) => {
        visible.value = boo
    }

    const handleOk = (el: FormInstance | undefined, data: User, cb: Function) =>{ 
        cb(el, data)
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
        userName: '',
        password: '',
        email: '',
    })

    const rules = reactive<FormRules>({
        userName: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { pattern: /^\w+$/, message: '请输入正确账号' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { 
                validator: (rule: any, value: any, callback: any) => {
                    if(value.length <= 6){
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
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确邮箱', trigger: 'blur' }
        ],
    })

    const onSubmit = async (formEl: FormInstance | undefined, user: User) => {
        console.log("data", user)
        if(!formEl) return;
        await formEl.validate((valid, fields) => {
            if(valid) {
                console.log('submit!!!')
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
        handleReset
    }

}

