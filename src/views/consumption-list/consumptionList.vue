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
        >
            <template #address="{ index }">
                <div>
                    这里是插槽写法{{index}}. 尝试中
                </div>
            </template>
        </CommTable>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import CommSearch from '@/components/comm-search.vue'
    import { FORM_TYPE } from '@/constants/common'
    import CommTable from '@/components/comm-table.vue'
    import { useTable } from './store'

    const optionsBnForm = ref([
        { 
            title: '新建', isShow: true, 
            handleFn: () => {
                console.log("这里是demo1")
            }
        },
    ])

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

    const queryData = (data: any) => {
        console.log("queryData", data)
    }

    // table

    const { columns, pagination, tableData } = useTable()
    
</script>