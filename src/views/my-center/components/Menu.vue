<template>
    <component 
        :is="menuData.children ? ElSubMenu : ElMenuItem" 
        :index="props._index"
        @click="clickMenu(menuData)"
    > 
        <template #title>
            <el-icon><Location /></el-icon>
            <span>{{menuData.meta?.title ?? '默认菜单'}}</span>
        </template>
        <menu-component 
            v-if="menuData.children" 
            v-for="menuItem in menuData.children"
            :_item="menuItem"
            :_index="`${menuItem.meta?.parent ?? ''}${menuItem.path}`"
        />
    </component>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'MenuComponent'
    })
</script>

<script lang="ts" setup>
    import { ref } from 'vue'
    import { Location } from '@element-plus/icons-vue'
    import { ElMenuItem, ElSubMenu } from 'element-plus'
    import { useRouter } from 'vue-router'

    interface Props {
        _item: object,
        _index: string,
    }

    const props = withDefaults(defineProps<Props>(), {
        _index: '0'
    })

    const menuData = ref(props._item) as any
    const router = useRouter()

    const clickMenu = (item: any) => {
        if(item.children && item.children.length > 0) return;
        router.push(`${item.meta?.parent ?? ''}${item.path.indexOf('/') === 0 ? '' : '/'}${item.path}`)
    }

</script>