<script setup lang="ts">
import { storeToRefs } from 'pinia';

const router = useRouter();
const cartStore = useCartStore();
const { deleteSelectItemAll } = cartStore;
const { cartList, isSelectItem, totalPrice } = storeToRefs(cartStore);

const statusBarHeight = ref(useGetWindowInfo().statusBarHeight);
const navBerTitle = ref(useGlobalStyle().navigationBarTitleText);
const isSelectAll = ref(false);
const goodsList = ref<GoodsVo[]>([]);
const pageNo = ref(1);
const total = ref(0);

onLoad(() => {
    handleGetGoodsItems();
});

watchEffect(() => {
    cartList.value.forEach(item => (item.select = isSelectAll.value));
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

const handleDeleteGoodsItem = () => {
    if (!isSelectItem.value) {
        Toast('当前未勾选商品!');
        return;
    }
    void Modal({
        content: '确定要删除勾选商品么?',
        cancelText: '再想想',
        confirmColor: '#40AE36'
    }).then(result => {
        if (result.confirm) {
            deleteSelectItemAll();
        }
    });
};

const handleScrolltolower = () => {
    if (goodsList.value.length < total.value) {
        pageNo.value++;
        handleGetGoodsItems();
    }
};
</script>
<template>
    <u-navbar left-icon :title="navBerTitle" :fixed="false" right-text="删除" @right-click="handleDeleteGoodsItem" />
    <scroll-view
        class="w-full p-[20rpx_30rpx]"
        :style="{ height: `calc(100% - 100rpx - 44px - ${statusBarHeight}px)` }"
        scroll-y
        @scrolltolower="handleScrolltolower">
        <view class="w-full rounded-xl bg-white">
            <template v-if="cartList.length">
                <view class="flex items-center justify-between gap-1.5 p-[20rpx_30rpx]" v-for="item in cartList" :key="item.id">
                    <u-checkbox v-model:checked="item.select" shape="circle" active-color="#40AE36" used-alone />
                    <image class="h-[160rpx] w-[160rpx]" :src="item.image" mode="aspectFit" />
                    <view class="flex flex-1 flex-col gap-1.5">
                        <view class="font-PingFangSC-Medium text-[26rpx] font-normal text-[#333]">
                            {{ item.name }}
                        </view>
                        <view class="flex items-center gap-2">
                            <view class="border border-[#F55726] p-0.5 text-[18rpx] text-[#F55726]">特价</view>
                            <view class="border border-[#40AE36] p-0.5 text-[18rpx] text-[#40AE36]">24小时发货</view>
                        </view>
                        <view class="flex h-[55rpx] items-center justify-between">
                            <view class="font-PingFangSC-Medium font-normal">
                                <text class="text-[22rpx] text-[#F55726]">￥</text>
                                <text class="text-[32rpx] text-[#F55726]">{{ item.price / 10 }}</text>
                            </view>
                            <x-stepper :goods="item" :is-show-cart-icon="false" :is-show-delete-tips="true" />
                        </view>
                    </view>
                </view>
            </template>
            <template v-else>
                <!--空数据 -->
                <view class="flex h-[304rpx] w-full flex-col items-center justify-center gap-1">
                    <view class="font-PingFangSC-Medium text-[32rpx] font-normal text-[#333]">购物车空空如也</view>
                    <view class="text-[28rpx] font-normal text-[#999]">赶紧慰劳一下自己吧</view>
                    <view
                        class="flex h-[70rpx] w-[178rpx] items-center justify-center rounded-3xl border border-[#40AE36] font-PingFangSC-Medium text-[26rpx] font-normal text-[#40AE36]"
                        @tap="router.pushTab('/pages/home/home')">
                        去逛逛
                    </view>
                </view>
            </template>
        </view>
        <x-title-bar title="为你推荐" />
        <!--商品列表-->
        <x-waterfall-goods v-model="goodsList" />
    </scroll-view>
    <view class="flex h-[100rpx] w-full items-center justify-between bg-white p-[20rpx_30rpx]">
        <u-checkbox label="全选" v-model:checked="isSelectAll" shape="circle" active-color="#40AE36" used-alone />
        <view class="flex items-center gap-2.5">
            <view class="text-[24rpx] font-normal text-[#333]">
                合计:
                <text class="font-PingFangSC-Medium text-[22rpx]">￥</text>
                <text class="font-PingFangSC-Semibold text-[32rpx]">{{ totalPrice / 10 }}</text>
            </view>
            <view
                class="flex h-[70rpx] w-[178rpx] items-center justify-center rounded-3xl bg-[#40AE36] font-PingFangSC-Medium text-[26rpx] font-normal text-white">
                去结算
            </view>
        </view>
    </view>
</template>

<style>
page {
    width: 100%;
    height: 100%;
}
</style>
