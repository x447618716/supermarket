<script setup lang="ts">
import throttle from 'lodash-es/throttle';

import service from '@/assets/image/icon/service@2x.png';
import settings from '@/assets/image/icon/settings@2x.png';
import ten from '@/assets/image/mine/10@2x.png';
import eleven from '@/assets/image/mine/11@2x.png';
import twelve from '@/assets/image/mine/12@2x.png';
import thirteen from '@/assets/image/mine/13@2x.png';
import fourteen from '@/assets/image/mine/14@2x.png';
import one from '@/assets/image/mine/1@2x.png';
import two from '@/assets/image/mine/2@2x.png';
import three from '@/assets/image/mine/3@2x.png';
import four from '@/assets/image/mine/4@2x.png';
import five from '@/assets/image/mine/5@2x.png';
import head from '@/assets/image/mine/head@2x.png';
import topBg from '@/assets/image/mine/topbg@2x.png';

const statusBarHeight = ref(useGetWindowInfo().statusBarHeight);
const navBerTitle = ref(useGlobalStyle().navigationBarTitleText);
const goodsList = ref<GoodsVo[]>([]);
const pageNo = ref(1);
const total = ref(0);
const isNavbar = ref(false);

onLoad(() => {
    handleGetGoodsItems();
});

const handleGetGoodsItems = () => {
    goodsItems({
        pageNum: pageNo.value,
        pageSize: 10
    })
        .then(res => {
            goodsList.value.push(...res.data.items);
            total.value = res.data.total;
        })
        .catch(() => {
            if (pageNo.value !== 1) {
                pageNo.value--;
            }
        });
};

onPageScroll(
    throttle(e => {
        isNavbar.value = e.scrollTop > 44 + (statusBarHeight.value ?? 0);
    }, 250)
);

watchEffect(() => {
    if (isNavbar.value) {
        void uni.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: '#fff'
        });
    } else {
        void uni.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#40AE36'
        });
    }
});

onReachBottom(() => {
    if (goodsList.value.length < total.value) {
        pageNo.value++;
        handleGetGoodsItems();
    }
});
</script>

<template>
    <u-navbar v-show="isNavbar" left-icon :title="navBerTitle" />
    <view class="relative h-[563rpx] w-full" :style="{ paddingTop: `${statusBarHeight}px` }">
        <image class="absolute inset-0 size-full" :src="topBg" mode="aspectFill" />
        <view class="relative z-10 flex justify-between p-4 pt-10">
            <view class="flex items-center">
                <image class="h-[110rpx] w-[110rpx]" :src="head" mode="aspectFill" />
                <view class="pl-2">
                    <view class="font-PingFangSC-Medium text-[32rpx] font-normal text-white">丢丢</view>
                    <view class="pt-0.5 text-[24rpx] font-normal text-[rgba(255,255,255,0.6)]">18046***822</view>
                </view>
            </view>
            <view class="flex gap-1">
                <image class="h-[48rpx] w-[48rpx]" :src="settings" mode="aspectFill" />
                <image class="h-[48rpx] w-[48rpx]" :src="service" mode="aspectFill" />
            </view>
        </view>
        <view class="relative z-10 flex items-center justify-around p-3">
            <view class="flex flex-col items-center gap-1">
                <view class="font-PingFangSC-Medium text-[36rpx] font-normal text-white">51</view>
                <view class="text-[24rpx] font-normal text-[rgba(255,255,255,0.6)]">余额(元)</view>
            </view>
            <view class="flex flex-col items-center gap-1">
                <view class="font-PingFangSC-Medium text-[36rpx] font-normal text-white">51</view>
                <view class="text-[24rpx] font-normal text-[rgba(255,255,255,0.6)]">优惠卷</view>
            </view>
            <view class="flex flex-col items-center gap-1">
                <view class="font-PingFangSC-Medium text-[36rpx] font-normal text-white">51</view>
                <view class="text-[24rpx] font-normal text-[rgba(255,255,255,0.6)]">电子卷</view>
            </view>
            <view class="flex flex-col items-center gap-1">
                <view class="font-PingFangSC-Medium text-[36rpx] font-normal text-white">51</view>
                <view class="text-[24rpx] font-normal text-[rgba(255,255,255,0.6)]">积分</view>
            </view>
        </view>
    </view>
    <view class="m-auto w-11/12 transform-[translateY(-170rpx)]">
        <view class="w-full rounded-xl bg-white pt-3 pb-3">
            <u-cell title="我的订单" value="全部订单" :border="false" is-link />
            <view class="flex items-center justify-around p-3">
                <view class="flex flex-col items-center gap-2">
                    <image class="h-[45rpx] w-[50rpx]" :src="two" mode="aspectFill" />
                    <view class="text-[22rpx] font-normal text-[#666]">待付款</view>
                </view>
                <view class="flex flex-col items-center gap-2">
                    <image class="h-[45rpx] w-[50rpx]" :src="one" mode="aspectFill" />
                    <view class="text-[22rpx] font-normal text-[#666]">待发货</view>
                </view>
                <view class="flex flex-col items-center gap-2">
                    <image class="h-[45rpx] w-[50rpx]" :src="four" mode="aspectFill" />
                    <view class="text-[22rpx] font-normal text-[#666]">待收货</view>
                </view>
                <view class="flex flex-col items-center gap-2">
                    <image class="h-[45rpx] w-[50rpx]" :src="three" mode="aspectFill" />
                    <view class="text-[22rpx] font-normal text-[#666]">待评价</view>
                </view>
                <view class="flex flex-col items-center gap-2">
                    <image class="h-[45rpx] w-[50rpx]" :src="five" mode="aspectFill" />
                    <view class="text-[22rpx] font-normal text-[#666]">退款/售后</view>
                </view>
            </view>
        </view>
        <view class="mt-3 w-full rounded-xl bg-white pt-3 pb-3">
            <u-cell title="我的服务" :border="false" />
            <view class="flex items-center justify-around p-3">
                <view class="flex flex-col items-center gap-2">
                    <image class="h-[70rpx] w-[70rpx]" :src="eleven" mode="aspectFill" />
                    <view class="text-[22rpx] font-normal text-[#666]">收货地址</view>
                </view>
                <view class="flex flex-col items-center gap-2">
                    <view class="flex h-[70rpx] w-[70rpx] items-center justify-center">
                        <image class="h-[50rpx] w-[40rpx]" :src="fourteen" mode="aspectFill" />
                    </view>
                    <view class="text-[22rpx] font-normal text-[#666]">足迹</view>
                </view>
                <view class="flex flex-col items-center gap-2">
                    <image class="h-[70rpx] w-[70rpx]" :src="twelve" mode="aspectFill" />
                    <view class="text-[22rpx] font-normal text-[#666]">我的收藏</view>
                </view>
                <view class="flex flex-col items-center gap-2">
                    <image class="h-[70rpx] w-[70rpx]" :src="ten" mode="aspectFill" />
                    <view class="text-[22rpx] font-normal text-[#666]">服务中心</view>
                </view>
                <view class="flex flex-col items-center gap-2">
                    <image class="h-[70rpx] w-[70rpx]" :src="thirteen" mode="aspectFill" />
                    <view class="text-[22rpx] font-normal text-[#666]">在线客服</view>
                </view>
            </view>
        </view>
        <title-bar title="为你推荐" />
        <!--商品列表-->
        <waterfall-goods v-model="goodsList" />
    </view>
</template>
