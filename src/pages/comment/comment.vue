<script setup lang="ts">
import head from '@/assets/image/mine/head@2x.png';

const props = defineProps<{
    id: string;
}>();

onLoad(() => {
    console.log(props.id);
});
</script>

<template>
    <view class="pb-20">
        <u-sticky>
            <view class="flex items-center gap-1 bg-white p-3">
                <image class="h-[80rpx] w-[80rpx]" src="http://cdn.xierongsheng.cn/5%402x.png" />
                <view class="font-PingFangSC-Medium text-[26rpx] text-[#333]">四川眉山 爱媛38号果冻橙礼盒装</view>
            </view>
        </u-sticky>

        <view class="m-auto mt-3 flex w-11/12 rounded-xl bg-white p-3">
            <u-avatar :src="head" />
            <view class="w-full pl-2">
                <view class="flex items-center justify-between">
                    <view>
                        <view class="font-PingFangSC-Medium text-[24rpx] text-[#333]">丢帝都</view>
                        <u-rate active-color="#FBA808" :model-value="3" />
                    </view>
                    <view class="text-[22rpx] text-[#999]">2021-12-27</view>
                </view>
                <view class="pt-2 pb-2 text-[24rpx] text-[#666]">入手很多，活动力度很大必须囤起来，橙子很好，水分足，甜度可口，没有酸感，大小很合适。</view>
                <view class="flex flex-wrap items-center gap-1">
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                </view>
            </view>
        </view>
        <view class="m-auto mt-3 flex w-11/12 rounded-xl bg-white p-3">
            <u-avatar :src="head" />
            <view class="w-full pl-2">
                <view class="flex items-center justify-between">
                    <view>
                        <view class="font-PingFangSC-Medium text-[24rpx] text-[#333]">丢帝都</view>
                        <u-rate active-color="#FBA808" :model-value="3" />
                    </view>
                    <view class="text-[22rpx] text-[#999]">2021-12-27</view>
                </view>
                <view class="pt-2 pb-2 text-[24rpx] text-[#666]">入手很多，活动力度很大必须囤起来，橙子很好，水分足，甜度可口，没有酸感，大小很合适。</view>
                <view class="flex flex-wrap items-center gap-1">
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                </view>
            </view>
        </view>
        <view class="m-auto mt-3 flex w-11/12 rounded-xl bg-white p-3">
            <u-avatar :src="head" />
            <view class="w-full pl-2">
                <view class="flex items-center justify-between">
                    <view>
                        <view class="font-PingFangSC-Medium text-[24rpx] text-[#333]">丢帝都</view>
                        <u-rate active-color="#FBA808" :model-value="3" />
                    </view>
                    <view class="text-[22rpx] text-[#999]">2021-12-27</view>
                </view>
                <view class="pt-2 pb-2 text-[24rpx] text-[#666]">入手很多，活动力度很大必须囤起来，橙子很好，水分足，甜度可口，没有酸感，大小很合适。</view>
                <view class="flex flex-wrap items-center gap-1">
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                </view>
            </view>
        </view>
        <view class="m-auto mt-3 flex w-11/12 rounded-xl bg-white p-3">
            <u-avatar :src="head" />
            <view class="w-full pl-2">
                <view class="flex items-center justify-between">
                    <view>
                        <view class="font-PingFangSC-Medium text-[24rpx] text-[#333]">丢帝都</view>
                        <u-rate active-color="#FBA808" :model-value="3" />
                    </view>
                    <view class="text-[22rpx] text-[#999]">2021-12-27</view>
                </view>
                <view class="pt-2 pb-2 text-[24rpx] text-[#666]">入手很多，活动力度很大必须囤起来，橙子很好，水分足，甜度可口，没有酸感，大小很合适。</view>
                <view class="flex flex-wrap items-center gap-1">
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                </view>
            </view>
        </view>
        <view class="m-auto mt-3 flex w-11/12 rounded-xl bg-white p-3">
            <u-avatar :src="head" />
            <view class="w-full pl-2">
                <view class="flex items-center justify-between">
                    <view>
                        <view class="font-PingFangSC-Medium text-[24rpx] text-[#333]">丢帝都</view>
                        <u-rate active-color="#FBA808" :model-value="3" />
                    </view>
                    <view class="text-[22rpx] text-[#999]">2021-12-27</view>
                </view>
                <view class="pt-2 pb-2 text-[24rpx] text-[#666]">入手很多，活动力度很大必须囤起来，橙子很好，水分足，甜度可口，没有酸感，大小很合适。</view>
                <view class="flex flex-wrap items-center gap-1">
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                </view>
            </view>
        </view>
        <view class="m-auto mt-3 flex w-11/12 rounded-xl bg-white p-3">
            <u-avatar :src="head" />
            <view class="w-full pl-2">
                <view class="flex items-center justify-between">
                    <view>
                        <view class="font-PingFangSC-Medium text-[24rpx] text-[#333]">丢帝都</view>
                        <u-rate active-color="#FBA808" :model-value="3" />
                    </view>
                    <view class="text-[22rpx] text-[#999]">2021-12-27</view>
                </view>
                <view class="pt-2 pb-2 text-[24rpx] text-[#666]">入手很多，活动力度很大必须囤起来，橙子很好，水分足，甜度可口，没有酸感，大小很合适。</view>
                <view class="flex flex-wrap items-center gap-1">
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                </view>
            </view>
        </view>
        <view class="m-auto mt-3 flex w-11/12 rounded-xl bg-white p-3">
            <u-avatar :src="head" />
            <view class="w-full pl-2">
                <view class="flex items-center justify-between">
                    <view>
                        <view class="font-PingFangSC-Medium text-[24rpx] text-[#333]">丢帝都</view>
                        <u-rate active-color="#FBA808" :model-value="3" />
                    </view>
                    <view class="text-[22rpx] text-[#999]">2021-12-27</view>
                </view>
                <view class="pt-2 pb-2 text-[24rpx] text-[#666]">入手很多，活动力度很大必须囤起来，橙子很好，水分足，甜度可口，没有酸感，大小很合适。</view>
                <view class="flex flex-wrap items-center gap-1">
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                </view>
            </view>
        </view>
        <view class="m-auto mt-3 flex w-11/12 rounded-xl bg-white p-3">
            <u-avatar :src="head" />
            <view class="w-full pl-2">
                <view class="flex items-center justify-between">
                    <view>
                        <view class="font-PingFangSC-Medium text-[24rpx] text-[#333]">丢帝都</view>
                        <u-rate active-color="#FBA808" :model-value="3" />
                    </view>
                    <view class="text-[22rpx] text-[#999]">2021-12-27</view>
                </view>
                <view class="pt-2 pb-2 text-[24rpx] text-[#666]">入手很多，活动力度很大必须囤起来，橙子很好，水分足，甜度可口，没有酸感，大小很合适。</view>
                <view class="flex flex-wrap items-center gap-1">
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                </view>
            </view>
        </view>
        <view class="m-auto mt-3 flex w-11/12 rounded-xl bg-white p-3">
            <u-avatar :src="head" />
            <view class="w-full pl-2">
                <view class="flex items-center justify-between">
                    <view>
                        <view class="font-PingFangSC-Medium text-[24rpx] text-[#333]">丢帝都</view>
                        <u-rate active-color="#FBA808" :model-value="3" />
                    </view>
                    <view class="text-[22rpx] text-[#999]">2021-12-27</view>
                </view>
                <view class="pt-2 pb-2 text-[24rpx] text-[#666]">入手很多，活动力度很大必须囤起来，橙子很好，水分足，甜度可口，没有酸感，大小很合适。</view>
                <view class="flex flex-wrap items-center gap-1">
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                    <image class="h-[112rpx] w-[112rpx] rounded-xl" src="http://cdn.xierongsheng.cn/5%402x.png" />
                </view>
            </view>
        </view>
    </view>
    <view class="fixed bottom-0 flex w-full items-center justify-around bg-white p-2">
        <view class="flex flex-col items-center justify-center">
            <u-icon name="heart" size="20" />
            <view class="text-[18rpx] text-[#333]">收藏</view>
        </view>
        <view class="flex flex-col items-center justify-center">
            <u-icon name="kefu-ermai" size="20" />
            <view class="text-[18rpx] text-[#333]">客服</view>
        </view>
        <view class="flex h-[70rpx] w-[500rpx] items-center justify-center rounded-3xl bg-[#40AE36] text-[26rpx] text-white">加入购物车</view>
    </view>
</template>
