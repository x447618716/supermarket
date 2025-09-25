<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        goodsList: GoodsVo[];
    }>(),
    {}
);
</script>

<template>
    <template v-for="item in props.goodsList">
        <template v-if="item.type === 1">
            <view class="flex items-center" :key="item.id">
                <view class="p-2">
                    <u-lazy-load class="h-[165rpx] w-[165rpx]" threshold="150" :image="item.image" :index="item.id" />
                </view>
                <view class="flex min-h-[248rpx] flex-1 flex-col justify-between border-b border-b-[#EBEBEB] p-2">
                    <view>
                        <view class="font-PingFangSC-Medium text-[26rpx] font-normal text-[#333]">{{ item.name }}</view>
                        <view class="text-[22rpx] font-normal text-[#999]">有机食品 | 水果</view>
                    </view>
                    <view>
                        <view class="flex items-center gap-2">
                            <view class="border border-[#F55726] p-0.5 text-[18rpx] text-[#F55726]">特价</view>
                            <view class="border border-[#40AE36] p-0.5 text-[18rpx] text-[#40AE36]">24小时发货</view>
                        </view>
                        <view class="flex items-center justify-between">
                            <view class="font-PingFangSC-Medium font-normal">
                                <text class="text-[22rpx] text-[#F55726]">￥</text>
                                <text class="text-[32rpx] text-[#F55726]">{{ item.price / 10 }}</text>
                                <text class="text-[22rpx] text-[#999]">/{{ item.unit }}</text>
                            </view>
                            <x-stepper :goods="item" />
                        </view>
                    </view>
                </view>
            </view>
        </template>
    </template>
</template>
