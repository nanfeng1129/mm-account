<template>
    <div @keyup.enter="queryData">
        <el-row>
            <el-form
                :label-position="props.labelPosition"
            >
                <el-col
                    v-for="item in optionsData"
                >
                    <el-form-item
                        :label="item.title"
                    >
                        <el-input
                            v-if="item.type === FORM_TYPE.INPUT"
                            v-model="formData[item.key]"
                            clearable
                            :placeholder="`请输入${item.title}`"
                        >

                        </el-input>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref, onBeforeMount } from 'vue'
    import { FORM_TYPE } from '../constants/common'

    interface OptionResourceType {
        val: string | number | boolean,
        title: string
    }


    interface OptionsFormType {
        type: string,
        value: string,
        key: string,
        title: string,
        disabled?: boolean,
        resource?: Array<OptionResourceType>
    }

    interface optionsBnFormType {
        title: string,
        isShow: boolean | Function,
        handleFn: Function
    }

    interface Props {
        optionsForm: Array<OptionsFormType>,
        optionsBnForm: Array<optionsBnFormType>,
        labelPosition?: any
    }

    const props =  withDefaults(defineProps<Props>(), {
        labelPosition: 'top'
    })

    const optionsData = ref(props.optionsForm)
    const formData = reactive<any>({})

    onBeforeMount(() => {
        optionsData.value.map(item => {
            formData[item.key] = item.value
        })
    })

    const queryData = () => {

    }

</script>