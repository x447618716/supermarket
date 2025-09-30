<script setup lang="ts">
import { storeToRefs } from 'pinia';

import alipayPay from '@/assets/image/alipay_pay@2x.png';
import wechatPay from '@/assets/image/wechat_pay@2x.png';

const cartStore = useCartStore();
const { cartSelectList, totalPrice } = storeToRefs(cartStore);

const payType = ref('1');

watchEffect(() => {
    console.log(payType.value);
});

const handleOrderSubmit = () => {
    console.log(payType.value);
};
</script>
<template>
    <view class="pt-3 pr-3 pb-[200rpx] pl-3">
        <view class="m-auto flex w-full gap-3 rounded-xl bg-white p-3">
            <u-icon class="self-start" name="map" color="#40AE36" size="22" />
            <view class="flex-1">
                <view class="font-PingFangSC-Medium text-[30rpx] text-[#333]">北京市海淀区恒大新宏福苑西区20号楼2单</view>
                <view class="text-[24rpx] text-[#999]">丢丢 15800000000</view>
            </view>
            <u-icon name="arrow-right" size="14" />
        </view>

        <view class="m-auto mt-3 w-full rounded-xl bg-white p-3">
            <view class="mb-3 flex flex-col" v-for="item in cartSelectList" :key="item.id">
                <view class="mb-3 flex items-center justify-between">
                    <view class="text-[24rpx] text-[#333]">生鲜快递发货</view>
                    <view class="text-[24rpx] text-[#40AE36]">上架24H发货，第三方物流配送</view>
                </view>
                <view class="flex justify-between gap-3">
                    <image class="w-[130rpx] rounded-xl bg-[#F8F9FA]" :src="item.image" mode="widthFix" />
                    <view class="flex flex-1 flex-col gap-0.5">
                        <view class="font-PingFangSC-Medium text-[26rpx] text-[#333]">{{ item.name }}</view>
                        <view class="text-[22rpx] text-[#999]">规格：1kg/{{ item.unit }}</view>
                        <view class="text-[22rpx] text-[#999]">数量：{{ item.num }}{{ item.unit }}</view>
                    </view>
                    <view class="font-PingFangSC-Semibold text-[32rpx] text-[#333]">
                        <text class="font-PingFangSC-Medium text-[22rpx]">￥</text>
                        {{ item.price / 10 }}
                    </view>
                </view>
            </view>
        </view>

        <view class="m-auto mt-3 flex w-full items-center justify-between rounded-xl bg-white p-3">
            <view class="text-[30rpx] text-[#333]">优惠卷</view>
            <view class="flex items-center gap-1">
                <view class="text-[28rpx] text-[#F55726]">-￥10</view>
                <x-coupon>
                    <u-icon name="arrow-right" size="14" />
                </x-coupon>
            </view>
        </view>

        <view class="m-auto mt-3 w-full rounded-xl bg-white p-3">
            <u-radio-group v-model="payType" active-color="#40AE36" placement="column">
                <view class="flex items-center justify-between">
                    <view class="flex items-center gap-3">
                        <image class="w-[50rpx]" :src="wechatPay" mode="widthFix" />
                        <view class="text-[30rpx] text-[#333]">微信支付</view>
                    </view>
                    <u-radio name="1" />
                </view>
                <view class="flex items-center justify-between">
                    <view class="flex items-center gap-3">
                        <image class="w-[50rpx]" :src="alipayPay" mode="widthFix" />
                        <view class="text-[30rpx] text-[#333]">支付宝</view>
                    </view>
                    <u-radio name="2" />
                </view>
            </u-radio-group>
        </view>

        <view class="m-auto mt-3 flex w-full items-center justify-between rounded-xl bg-white p-3">
            <view class="text-[30rpx] text-[#333]">订单备注</view>
            <view class="flex items-center gap-1">
                <view class="text-[28rpx] text-[#999]">选择服务</view>
                <u-icon name="arrow-right" size="14" />
            </view>
        </view>
    </view>

    <view class="fixed bottom-0 h-[100rpx] w-full bg-white p-[20rpx_30rpx]">
        <view class="flex w-full items-center justify-end gap-2.5">
            <view class="text-[24rpx] font-normal text-[#333]">
                <text class="pr-3">共{{ cartSelectList.length }}件,</text>
                <text class="pr-1">合计:</text>
                <text class="font-PingFangSC-Medium text-[22rpx] text-[#F55726]">￥</text>
                <text class="font-PingFangSC-Semibold text-[32rpx] text-[#F55726]">{{ totalPrice / 10 }}</text>
            </view>
            <view
                class="flex h-[70rpx] w-[178rpx] items-center justify-center rounded-3xl bg-[#40AE36] font-PingFangSC-Medium text-[26rpx] font-normal text-white"
                @tap="handleOrderSubmit">
                提交订单
            </view>
        </view>
        <u-safe-bottom />
    </view>
</template>
