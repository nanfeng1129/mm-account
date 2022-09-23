<template>
    <div>
        <CommSearch
            :options-form="optionsForm"
            :optionsBnForm="optionsBnForm"
            @query-data="queryData"
        />
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import CommSearch from '@/components/comm-search.vue'
    import { FORM_TYPE } from '@/constants/common'

    const optionsBnForm = ref([
        { 
            title: 'demo1', isShow: false, 
            handleFn: () => {
                console.log("这里是demo1")
            }
        },
        { 
            title: 'demo2', isShow: true, 
            handleFn: () => {
                console.log("这里是demo2")
            }
        },
        { 
            title: 'demo3', isShow: () => true, 
            handleFn: () => {
                console.log("这里是demo3")
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
    
</script>