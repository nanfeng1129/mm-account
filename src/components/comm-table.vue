<template>
    <div class="comm-table">
        <el-alert
            type="success"
            :closable="false"
        >
            <template #title>
                <div class="comm-table-title">
                    <div>
                        <span>记录共计 <span>{{ pagination.total }}</span>条 </span>
                    </div>
                </div>
            </template>
        </el-alert>
        <el-table
            :data="_tableData"
        >

            <el-table-column
            >

            </el-table-column>
        </el-table>
        <div class="comm-table-pagination">
            <el-pagination
                :currentPage="pagination.current"
                :page-size="pagination.pageSize"
                :total="pagination.total"
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
    }

    interface Props {
        tableData: Array<any>,
        pagination: Pagination,
        columns: Columns
    }

    const props =  defineProps<Props>()
    const emit = defineEmits(['handleTableChange',])

    const _tableData = ref(cloneDeep(props.tableData))

    const handleCurrentChange = (val: number) => {
        emit('handleTableChange', val)
    }

</script>

<style>

</style>