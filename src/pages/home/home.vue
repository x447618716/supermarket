<script setup lang="ts">
import throttle from 'lodash-es/throttle';

import location from '@/assets/image/icon/location@2x.png';
import message from '@/assets/image/icon/message@2x.png';
import pullDown from '@/assets/image/icon/pull-down@2x.png';
import scan from '@/assets/image/icon/scan@2x.png';
import router from '@/router';

const searchAnimation = ref(false);
const statusBarHeight = ref(useGetWindowInfo().statusBarHeight);
const bannerList = ref<BannerVo[]>([]);
const goodsCategoryList = ref<GoodsCategoryVo[]>([]);
const recommend = ref<RecommendVo>();

const active = ref<1 | 2 | 3 | 4>(1);

const goodsList = ref<GoodsVo[]>([]);
const pageNo = ref(1);
const total = ref(0);

const customNavHeight = computed(() => {
    if (statusBarHeight.value) {
        return Number(uni.upx2px(88)) + statusBarHeight.value + 1;
    } else {
        return Number(uni.upx2px(88)) + 1;
    }
});

const topValue = computed(() => {
    if (statusBarHeight.value) {
        return Number(uni.upx2px(14)) + statusBarHeight.value;
    } else {
        return Number(uni.upx2px(14));
    }
});

onLoad(() => {
    void getAdBanner().then(res => {
        bannerList.value = res.data;
    });
    void getGoodsCategory().then(res => {
        goodsCategoryList.value = res.data;
    });

    void goodsRecommend().then(res => {
        recommend.value = res.data;
    });

    handleGetGoodsItems();
});

onReachBottom(() => {
    if (goodsList.value.length < total.value) {
        pageNo.value++;
        handleGetGoodsItems();
    }
});

onPageScroll(
    throttle(e => {
        searchAnimation.value = e.scrollTop > customNavHeight.value;
    }, 250)
);

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
</script>

<template>
    <u-navbar height="88rpx" fixed left-icon placeholder bg-color="#40AE36">
        <template #center>
            <view class="flex h-[88rpx] w-full items-center justify-between p-2">
                <view class="flex items-center gap-1">
                    <image class="h-5 w-5" :src="location" mode="aspectFill" />
                    <template v-if="!searchAnimation">
                        <text class="font-PingFangSC-Medium text-[30rpx] text-white">海定区中关村大夏</text>
                        <image class="h-1 w-1.5" :src="pullDown" mode="aspectFill" />
                    </template>
                </view>
                <view class="flex items-center gap-1">
                    <image class="h-5 w-5" :src="scan" mode="aspectFill" />
                    <image class="h-5 w-5" :src="message" mode="aspectFill" />
                </view>
            </view>
        </template>
    </u-navbar>
    <view class="p-[24rpx_30rpx]">
        <!--搜索栏-->
        <view class="mb-3 h-[80rpx] w-full">
            <x-search-bar
                :class="[searchAnimation ? 'fixed top-[14rpx] left-[75rpx] z-50 h-[60rpx]! w-[320rpx]!' : 'm-auto w-11/12!']"
                :style="{ top: searchAnimation ? `${topValue}px` : 'auto' }" />
        </view>
        <!--Banner-->
        <u-swiper :list="bannerList" previous-margin="30" next-margin="30" circular :autoplay="false" radius="5" bg-color="#ffffff" />
        <!--商品分类-->
        <u-scroll-list :indicator="false">
            <view class="flex items-center">
                <view
                    class="p-3"
                    v-for="item in goodsCategoryList"
                    :key="item.id"
                    @tap="router.push({ path: '/pages/categorize/categorize-copy', query: { categoryId: item.id } })">
                    <image class="h-[108rpx] w-[108rpx]" :src="item.icon" mode="aspectFill" />
                    <view class="font-PingFangSC-Regular text-[24rpx] text-[#666]">{{ item.name }}</view>
                </view>
            </view>
        </u-scroll-list>
        <!--活动板块1-->
        <view class="rounded-xl bg-white p-3.5">
            <view class="flex items-center justify-between pb-3.5">
                <view class="flex items-center font-PingFangSC-Medium text-[30rpx] font-normal text-[#333333]">
                    {{ recommend?.title }}
                    <view class="ml-1 self-end rounded-[2px] bg-[#EC9F09] p-0.5 text-[18rpx] text-white">{{ recommend?.label }}</view>
                </view>
                <view class="text-[24rpx] font-normal text-[#40AE36]">查看更多</view>
            </view>
            <view class="flex justify-between">
                <view
                    class="flex w-[176rpx] flex-col gap-1"
                    v-for="item in recommend?.items"
                    :key="item.id"
                    @tap="router.push({ path: '/pages/goods-details/goods-details', query: { id: item.id } })">
                    <image class="h-[176rpx] w-[176rpx]" :src="item.image" mode="aspectFill" />
                    <view class="font-PingFangSC-Regular line-clamp-1 text-[24rpx] font-normal text-[#666]">{{ item.name }}</view>
                    <view class="flex items-center justify-between">
                        <view class="line-clamp-1 font-PingFangSC-Medium text-[22rpx] font-normal text-[#F55726]">￥{{ item.price / 10 }}</view>
                        <x-number-add :goods="item" />
                    </view>
                </view>
            </view>
        </view>
        <!--活动板块2-->
        <view class="mt-2 flex justify-between">
            <view class="rounded-xl bg-white p-3.5">
                <view class="font-PingFangSC-Medium text-[30rpx] font-normal text-[#333]">吃好点</view>
                <view class="font-PingFangSC-Regular pt-1 pb-1.5 text-[24rpx] font-normal text-[#999]">美国小木瓜尝鲜</view>
                <view class="flex items-center justify-between gap-1">
                    <image class="h-[130rpx] w-[130rpx]" src="http://cdn.xierongsheng.cn/01%402x.png" mode="aspectFill" />
                    <image class="h-[130rpx] w-[130rpx]" src="http://cdn.xierongsheng.cn/02%402x.png" mode="aspectFill" />
                </view>
            </view>
            <view class="rounded-xl bg-white p-3.5">
                <view class="font-PingFangSC-Medium text-[30rpx] font-normal text-[#333]">产地量贩</view>
                <view class="font-PingFangSC-Regular pt-1 pb-1.5 text-[24rpx] font-normal text-[#999]">核桃19.9元/箱</view>
                <view class="flex items-center justify-between gap-1">
                    <image class="h-[130rpx] w-[130rpx]" src="http://cdn.xierongsheng.cn/03%402x.png" mode="aspectFill" />
                    <image class="h-[130rpx] w-[130rpx]" src="http://cdn.xierongsheng.cn/04%402x.png" mode="aspectFill" />
                </view>
            </view>
        </view>
        <u-sticky :custom-nav-height="customNavHeight">
            <view class="flex items-center justify-between bg-[#F8F9FA] pt-3.5 pb-3.5">
                <view class="flex flex-col items-center gap-0.5" @click="active = 1">
                    <view :class="[active === 1 ? 'text-[#40AE36]' : 'text-[#333]']" class="font-PingFangSC-Medium text-[30rpx] font-normal">全部</view>
                    <view
                        :class="[active === 1 ? 'bg-[#40AE36] text-white' : 'text-[#999]']"
                        class="rounded-xl pt-0.5 pr-1 pb-0.5 pl-1 text-[22rpx] font-normal">
                        猜你喜欢
                    </view>
                </view>
                <u-line color="#999" direction="col" length="36rpx" />
                <view class="gab-0.5 flex flex-col items-center" @click="active = 2">
                    <view :class="[active === 2 ? 'text-[#40AE36]' : 'text-[#333]']" class="font-PingFangSC-Medium text-[30rpx] font-normal">时令</view>
                    <view
                        :class="[active === 2 ? 'bg-[#40AE36] text-white' : 'text-[#999]']"
                        class="rounded-xl pt-0.5 pr-1 pb-0.5 pl-1 text-[22rpx] font-normal">
                        当季优选
                    </view>
                </view>
                <u-line color="#999" direction="col" length="36rpx" />
                <view class="gab-0.5 flex flex-col items-center" @click="active = 3">
                    <view :class="[active === 3 ? 'text-[#40AE36]' : 'text-[#333]']" class="font-PingFangSC-Medium text-[30rpx] font-normal">进口</view>
                    <view
                        :class="[active === 3 ? 'bg-[#40AE36] text-white' : 'text-[#999]']"
                        class="rounded-xl pt-0.5 pr-1 pb-0.5 pl-1 text-[22rpx] font-normal">
                        国际直采
                    </view>
                </view>
                <u-line color="#999" direction="col" length="36rpx" />
                <view class="flex flex-col items-center gap-0.5" @click="active = 4">
                    <view :class="[active === 4 ? 'text-[#40AE36]' : 'text-[#333]']" class="font-PingFangSC-Medium text-[30rpx] font-normal">人气</view>
                    <view
                        :class="[active === 4 ? 'bg-[#40AE36] text-white' : 'text-[#999]']"
                        class="rounded-xl pt-0.5 pr-1 pb-0.5 pl-1 text-[22rpx] font-normal">
                        大家在买
                    </view>
                </view>
            </view>
        </u-sticky>
        <!--商品列表-->
        <x-waterfall-goods v-model="goodsList" is-show-ad />
    </view>
</template>
