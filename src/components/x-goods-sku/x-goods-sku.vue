<script setup lang="ts">
import { storeToRefs } from 'pinia';

import type { CartType } from '@/stores/modules/cart';

const props = defineProps<{
    id: string;
}>();

const emit = defineEmits<{ open: [] }>();

const cartStore = useCartStore();
//const { addCart, deleteItemById } = cartStore;
const { cartList } = storeToRefs(cartStore);

const goodsItem = ref<CartType>();
const goodsNum = ref(1);
const active = ref(1);
const list = ref<string[]>(['0.5', '0.8', '1']);
const show = ref(false);

watchEffect(() => {
    goodsItem.value = cartList.value.find(item => item.id === props.id);
});

watchEffect(() => {
    goodsNum.value = goodsItem.value?.num ?? 1;
});

const handleOpen = () => {
    show.value = true;
    emit('open');
};
</script>

<template>
    <view>
        <view @click="handleOpen">
            <slot></slot>
        </view>
        <u-popup v-model:show="show" bg-color="#fff" :closeable="true">
            <view class="flex items-center justify-center p-3 font-PingFangSC-Medium text-[32rpx] text-[#333]">选择规格</view>
            <view class="p-6">
                <view class="text-[28rpx] text-[#333]">选择重量</view>
                <view class="mt-3 mb-6 flex items-center gap-1.5">
                    <view
                        v-for="(item, index) in list"
                        :key="index"
                        @tap="active = index"
                        class="flex h-[64rpx] w-[160rpx] items-center justify-center rounded-xl bg-[#F8F9FA] font-PingFangSC-Medium text-[28rpx]"
                        :class="[active === index ? 'text-[#40AE36]' : 'text-[#333]']">
                        {{ item }} kg
                    </view>
                </view>
                <view class="mb-3 text-[28rpx] text-[#333]">选择数量</view>
                <u-number-box
                    v-model="goodsNum"
                    icon-style="font-size:12px"
                    button-width="60rpx"
                    button-size="60rpx"
                    input-width="40"
                    min="1"
                    max="99"
                    bg-color="#F8F9FA"
                    color="#333"
                    disabled-input
                    input-bg-color="transparent"
                    mini-mode
                    integer />
                <view class="mt-5 flex h-[90rpx] w-[630rpx] items-center justify-center rounded-3xl bg-[#40AE36] text-[30rpx] text-white">添加到购物车</view>
            </view>
        </u-popup>
    </view>
</template>
