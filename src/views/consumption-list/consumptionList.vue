<template>
    <div>
        <CommSearch
            :options-form="optionsForm"
            :optionsBnForm="optionsBnForm"
            @query-data="queryData"
        />
        <CommTable 
            :columns="columns"
            :tableData="tableData"
            :pagination="pagination"
            @handle-table-change="handleTableChange"
        >
            <template #address="{ index }">
                <div>
                    这里是插槽写法{{index}}. 尝试中
                </div>
            </template>
        </CommTable>
        <el-dialog v-model="visible" title="消费条目" width="600px">
            <el-form 
                :model="formData" 
                ref="consumptionForm"
                label-width="80px"
                label-position="top"
                :rules="rules"
            >
                <el-form-item label="消费名称" prop="consumptionName">
                    <el-input v-model="formData.consumptionName" autocomplete="off" placeholder="请输入消费名称"/>
                </el-form-item>
                <el-form-item label="消费金额" prop="consumptionNum">
                    <el-input v-model="formData.consumptionNum" autocomplete="off" placeholder="请输入消费金额"/>
                </el-form-item>
                <el-form-item label="消费类别" prop="consumptionCategory">
                    <el-select
                        v-model="formData.consumptionCategory"
                        multiple
                        placeholder="请选择消费类别"
                        autocomplete="off"
                        style="width: 100%"
                        @change="showValue"
                    >
                        <el-option
                            v-for="item in categoryArray"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="消费时间" prop="consumptionTime">
                    <el-date-picker
                        v-model="formData.consumptionTime"
                        type="datetime"
                        placeholder="请选择消费时间"
                        :shortcuts="shortcuts"
                    />
                    <!-- <el-input v-model="formData.consumptionTime" autocomplete="off" placeholder="请选择消费时间"/> -->
                </el-form-item>
                <el-form-item label="消费备注" prop="consumptionRemark">
                    <el-input v-model="formData.consumptionRemark" autocomplete="off" placeholder="请输入消费备注"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleReset(consumptionForm)">重置</el-button>
                    <el-button type="primary" @click="handleOk(consumptionForm, formData, onSubmit)">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
    import { ref, nextTick } from 'vue'
    import CommSearch from '@/components/comm-search.vue'
    import { FORM_TYPE } from '@/constants/common'
    import CommTable from '@/components/comm-table.vue'
    import { useTable, useDialog, useForm, useDateTime } from './store'

    // comm-search buttons
    const optionsBnForm = ref([
        { 
            title: '新建', isShow: true, 
            handleFn: () => {
                changeVisible(true)
                nextTick(() => {
                    handleReset(consumptionForm.value)
                })
            }
        },
    ])

    // comm-search options
    const optionsForm = ref([
        {
            type: FORM_TYPE.INPUT,
            key: 'demo1',
            value: '',
            title: '输入框'
        },
        {
            type: FORM_TYPE.SELECT,
            key: 'demo2',
            value: '',
            title: '选择框',
            resource: [
                { val: '11', title: '11' },
                { val: '22', title: '22' }
            ]
        },
        {
            type: FORM_TYPE.SELECT_FILTER,
            key: 'demo3',
            value: '',
            title: '选择框过滤框',
            resource: [
                { val: '11', title: '我我我我我' },
                { val: '22', title: '他他他他他' }
            ]
        },
        {
            type: FORM_TYPE.DATE_PICKER,
            key: 'demo4',
            value: '2022-09-22',
            title: '日期框'
        },
        {
            type: FORM_TYPE.RANGE_PICKER,
            key: 'demo5',
            value: ['2022-09-22', '2022-10-11'],
            title: '日期范围框'
        },
    ])

    // consumption category options
    const categoryArray = [
        { label: '网上购物', value: '01' },
        { label: '早餐', value: '02' },
        { label: '午餐', value: '03' },
        { label: '晚餐', value: '04' },
        { label: '线下商店', value: '05' },
        { label: '理财', value: '06' },
        { label: '转账', value: '07' },
        { label: '娱乐', value: '08' },
    ]


    const queryData = (data: any) => {
        console.log("queryData", data)
    }

    // table
    const { columns, pagination, tableData, handleTableChange } = useTable()

    // dialog
    const { visible, handleOk, changeVisible } = useDialog()

    // form
    const { formData, rules, handleReset, onSubmit, consumptionForm } = useForm()

    // date-time
    const { shortcuts } = useDateTime()

    const showValue = (val: any) => {
        console.log("多选返回的值是什么呢", val)
    }
    
</script>