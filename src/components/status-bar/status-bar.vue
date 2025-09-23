<script setup lang="ts">
const statusBarHeight = ref('20px');
statusBarHeight.value = useGetWindowInfo().statusBarHeight + 'px';
const props = withDefaults(
    defineProps<{
        bgColor?: string;
    }>(),
    {
        bgColor: () => useGlobalStyle().navigationBarBackgroundColor
    }
);
</script>

<template>
    <view :style="{ height: statusBarHeight, backgroundColor: props.bgColor }">
        <slot></slot>
    </view>
</template>
