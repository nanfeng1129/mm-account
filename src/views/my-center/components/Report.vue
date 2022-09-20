<template>
    <div class="my-center-report">
        <div>
            {{props.title}}:￥100.00
        </div>
        这里是轮播图部分
    </div>
</template>

<script lang="ts" setup>

    interface Props {
        title: string
    }

    const props = withDefaults(defineProps<Props>(), {
        title: '昨日消费总额'
    })
</script>