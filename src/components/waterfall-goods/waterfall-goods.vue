<script setup lang="ts">
const uWaterfallRef = ref(null);
const goodsList = defineModel({ required: true, type: Array, default: [] });
</script>

<template>
    <u-waterfall v-model="goodsList" ref="uWaterfallRef">
        <template v-slot:column="{ colList }">
            <template v-for="item in colList">
                <template v-if="item.type === 1">
                    <view class="mb-2 flex flex-col gap-2 rounded-xl bg-white p-2" :key="item.id">
                        <u-lazy-load class="w-full" threshold="-450" :image="item.image" :index="item.id" />
                        <view class="font-PingFangSC-Medium text-[26rpx] font-normal text-[#333]">
                            {{ item.title }}
                        </view>
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
                            <stepper :goods="item" />
                        </view>
                    </view>
                </template>
            </template>
        </template>
    </u-waterfall>
</template>
