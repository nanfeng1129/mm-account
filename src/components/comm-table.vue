<template>
    <div class="comm-table">
        <el-alert
            type="success"
            :closable="false"
        >
            <template #title>
                <div class="comm-table-title">
                    <div>
                        <span>记录共计 <span>{{ _pagination.total }}</span>条 </span>
                    </div>
                </div>
            </template>
        </el-alert>
        <el-table
            :data="_tableData"
            stripe
        >
            <!-- <div v-for="item in _columns"> -->
                <el-table-column
                    v-for="item in _columns"
                    :prop="item.prop"
                    :label="item.label"
                    :formatter="item.formatter"
                >
                    <template v-if="!!item.showSlot" #default="{ row, column, $index }">
                        <slot :name="item.prop" :row="row" :column="column" :index="$index"></slot>
                    </template>
                </el-table-column>
            <!-- </div> -->
        </el-table>
        <div class="comm-table-pagination">
            <el-pagination
                :currentPage="_pagination.current"
                :page-size="_pagination.pageSize"
                :total="_pagination.total"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, reactive } from 'vue'
    import { cloneDeep } from 'lodash'

    interface Pagination {
        current: number,
        pageSize: number,
        total: number
    }

    interface Columns {
        prop: string,
        label: string,
        showSlot?: boolean, 
        width?: string | number,
        fixed?: string | boolean,
        renderHeader?: Function,
        formatter?: any
    }

    interface Props {
        tableData: Array<any>,
        pagination: Pagination,
        columns: Array<Columns>
    }

    const props =  defineProps<Props>()
    const emit = defineEmits(['handleTableChange',])

    const _tableData = ref(cloneDeep(props.tableData))
    const _pagination = ref(cloneDeep(props.pagination))
    const _columns = ref(cloneDeep(props.columns))

    const handleCurrentChange = (val: number) => {
        emit('handleTableChange', val)
    }

</script>

<style>

</style>