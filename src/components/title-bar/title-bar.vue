<script setup lang="ts">
import titleIconLeft from '@/assets/image/icon/tit-icon-l@2x.png';
import titleIconRight from '@/assets/image/icon/tit-icon-r@2x.png';

const props = defineProps<{
    title: string;
}>();
</script>

<template>
    <view class="flex items-center justify-center gap-4 p-4">
        <image class="h-[22rpx] w-[40rpx]" :src="titleIconLeft" mode="aspectFill" />
        <view class="font-PingFangSC-Medium text-[30rpx] font-normal text-[#333]">
            <slot>{{ props.title }}</slot>
        </view>
        <image class="h-[22rpx] w-[40rpx]" :src="titleIconRight" mode="aspectFill" />
    </view>
</template>
