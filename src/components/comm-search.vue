<template>
    <div @keyup.enter="queryData" class="comm-search">
        <el-row>
            <el-col
                :span="8"
                v-for="item in optionsData"
                class="comm-search-col"
            >
                <div>{{item.title}}</div>
                <div class="comm-search-div">
                    <el-input
                        v-if="item.type === FORM_TYPE.INPUT"
                        v-model="formData[item.key]"
                        clearable
                        :placeholder="`请输入${item.title}`"
                        class="comm-search-div-input"
                    />

                    <el-select 
                        v-if="item.type === FORM_TYPE.SELECT"
                        v-model="formData[item.key]"
                        clearable
                        :placeholder="`请输入${item.title}`"
                        class="comm-search-div-select"
                    >
                        <el-option
                            v-for="item2 in item.resource"
                            :label="item2.title"
                            :value="item2.val"
                        />
                    </el-select>

                    <el-select 
                        v-if="item.type === FORM_TYPE.SELECT_FILTER"
                        v-model="formData[item.key]"
                        clearable
                        filterable
                        :placeholder="`请输入${item.title}`"
                        class="comm-search-div-select"
                    >
                        <el-option
                            v-for="item2 in item.resource"
                            :label="item2.title"
                            :value="item2.val"
                        />
                    </el-select>

                    <el-date-picker
                        v-if="item.type === FORM_TYPE.DATE_PICKER"
                        v-model="formData[item.key]"
                        type="date"
                        :placeholder="`请选择${item.title}`"
                        :shortcuts="shortcuts"
                        value-format="YYYY-MM-DD"
                        class="comm-search-div-date"
                    />

                    <el-date-picker
                        v-if="item.type === FORM_TYPE.RANGE_PICKER"
                        v-model="formData[item.key]"
                        type="daterange"
                        :placeholder="`请选择${item.title}`"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="YYYY-MM-DD"
                        class="comm-search-div-range"
                    />
                </div>
                <!-- </el-form-item> -->
            </el-col>

            <!-- 补充列 -->
            <el-col 
                :span="8"
                class="comm-search-col"
                v-for="item in fillCol"
            >
            </el-col>

            <el-col
                :span="8"
                class="comm-search-col"
                v-if="optionsData.length > 0"
            >
                <!-- <el-form-item> -->
                <div class="comm-search-col-btn">
                    <el-button
                        type="primary"
                        @click="queryData"
                        class="comm-search-col-btn-item"
                    >
                        查询
                    </el-button>
                    <el-button
                        @click="initFormData"
                        class="comm-search-col-btn-item"
                    >
                        重置
                    </el-button>
                    <el-button
                        v-if="props.optionsForm.length > 2"
                        class="comm-search-col-btn-item"
                        @click="changeOptionsData"
                    >
                        <span v-show="needExpand">
                            展开
                            <el-icon><ArrowDown /></el-icon>
                        </span>
                        <span v-show="!needExpand">
                            收起
                            <el-icon><ArrowUp /></el-icon>
                        </span>
                    </el-button>
                </div>
                    
                <!-- </el-form-item> -->
            </el-col>
            
        </el-row>
        <el-row v-if="optionsBnData && optionsBnData.length > 0">
            <el-col :span="24" class="comm-search-optionBn">
                <div v-for="item in optionsBnData">
                    <el-button
                        class="comm-search-optionBn-item"
                        v-if="typeof item.isShow === 'function' ? item.isShow() : item.isShow"
                        :type="item.bnType ?? 'default'"
                        @click="item.handleFn"
                    >
                        {{item.title}}
                    </el-button>
                </div>
                
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
    import { reactive, ref, onBeforeMount, computed } from 'vue'
    import { FORM_TYPE } from '../constants/common'
    import { useDate } from './store' 
    import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
    import { cloneDeep } from 'lodash'
    import { EpPropMergeType } from "element-plus/es/utils"

    // Vue3 不支持在 withDefaults 中使用外部导入的 interface
    // 先写在这里，后续转移到 store 文件中
    interface OptionResourceType {
        val: string | number | boolean,
        title: string
    }

    interface OptionsFormType {
        type: string,
        value: string | Array<string>,
        key: string,
        title: string,
        disabled?: boolean,
        resource?: Array<OptionResourceType>
    }

    interface optionsBnFormType {
        title: string,
        bnType?: EpPropMergeType<StringConstructor, "" | "default" | "primary" | "success" | "warning" | "info" | "danger" | "text", unknown>, 
        isShow: boolean | Function,
        handleFn: Function
    }

    interface Props {
        optionsForm: Array<OptionsFormType>,
        optionsBnForm?: Array<optionsBnFormType>,
        labelPosition?: any
    }

    const props =  withDefaults(defineProps<Props>(), {
        labelPosition: 'top'
    })

    const emit = defineEmits(['queryData'])

    const optionsData = ref(cloneDeep(props.optionsForm.slice(0, 2)))
    const formData = reactive<any>({})
    const optionsBnData = ref(cloneDeep(props.optionsBnForm))

    onBeforeMount(() => {
        initFormData()
    })

    // Date
    const { shortcuts } = useDate()

    const fillCol = computed(() => {
        return (2 - optionsData.value.length % 3)
    })

    const queryData = () => {
        emit('queryData', formData)
    }

    const initFormData = () => {
        props.optionsForm.map(item => {
            formData[item.key] = cloneDeep(item.value)
        })
    }

    const needExpand = ref(true)

    const changeOptionsData = () => {
        if(needExpand.value){
            optionsData.value = cloneDeep(props.optionsForm)
        }else {
            optionsData.value = cloneDeep(props.optionsForm.slice(0, 2))
        }  
        needExpand.value = !needExpand.value 
    }

</script>

<style scoped>
/* :deep(.el-date-editor){
    width: 100%;
} */
:deep(.el-input__wrapper){
    width: 100%;
}

</style>