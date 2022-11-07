import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { axiosPostJson } from '@/utlis/util'
import { RESP_TYPE } from '@/constants/common'
import Message from '@/utlis/message'

interface Consumption {
    consumptionName: string,
    consumptionNum: number | null,
    consumptionCategory: Array<string>,
    consumptionTime: string,
    consumptionRemark: string,
}

export const useTable = () => {
    const tableData = [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
    ]

    const pagination = ref({
        current: 1,
        pageSize: 10,
        total: 4
    })

    const columns = [
        {
            prop: 'consumptionTime',
            label: '消费时间',
            width: 180,
        },
        {
            prop: 'consumptionName',
            label: '消费名称',
            width: 180,
        },
        {
            prop: 'consumptionNum',
            label: '消费金额（元）',
        },
        {
            prop: 'consumptionCategory',
            label: '消费类别',
            showSlot: true
        },
        {
            prop: 'consumptionRemark',
            label: '消费备注',
            showSlot: true
        },
    ]

    return {
        tableData,
        pagination,
        columns
    }
}

export const useDialog = () => {
    const visible = ref(false)

    const changeVisible = (boo: boolean) => {
        visible.value = boo
    }

    const handleOk = (el: FormInstance | undefined, data: Consumption, cb: Function) =>{ 
        cb(el, data, changeVisible)
    }

    return {
        visible,
        handleOk,
        changeVisible
    }
}

export const useForm = () => {

    const consumptionForm = ref()

    const formData = reactive<Consumption>({
        consumptionName: '',
        consumptionNum: null,
        consumptionCategory: [],
        consumptionTime: '',
        consumptionRemark: '',
    })

    const rules = reactive<FormRules>({
        consumptionTime: [
            { required: true, message: '请选择消费时间', trigger: 'blur' },
        ],
        consumptionName: [
            { required: true, message: '请输入消费名称', trigger: 'blur' },
        ],
        consumptionNum: [
            { required: true, message: '请输入消费金额', trigger: 'blur' }
        ],
        consumptionCategory: [
            { required: true, type: 'array', message: '请选择消费类别', trigger: 'blur' },
            { 
                validator: (rule: any, value: any, callback: any) => {
                    console.log("会走到这边来嘛")
                    if(value.length > 3){
                        callback(new Error('选择的类别不能超过三个'))
                    }
                    callback()
                    // else if(/^[\u0000-\u00ff]$/.test(val))
                }, 
                trigger: 'blur' 
            }
        ],
        consumptionRemark: [
            { required: true, message: '请输入消费备注', trigger: 'blur' }
        ],
    })

    const onSubmit = async (formEl: FormInstance | undefined, consumption: Consumption, changeVisible: Function) => {
        if(!formEl) return;
        await formEl.validate((valid, fields) => {
            if(valid) {
                axiosPostJson('/user/login', consumption).then((res: any) => {
                    if(res.data.code === RESP_TYPE.SUCCESS) {
                        Message.success("登录成功")
                        sessionStorage.setItem("token", res.data.data)
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
        consumptionForm,
        formData,
        rules,
        onSubmit,
        handleReset,
    }

}

