<script setup lang="ts">
import { storeToRefs } from 'pinia';

import cart from '@/assets/image/icon/cart-icon@2x.png';
import { useCartStore } from '@/stores/modules/cart';

const cartStore = useCartStore();
const { cartList } = storeToRefs(cartStore);
</script>

<template>
    <view class="relative h-[44rpx] w-[44rpx]">
        <u-badge class="z-10" max="99" absolute :offset="[-5, -5]" :value="cartList.length" />
        <image class="size-full" :src="cart" mode="aspectFill" />
    </view>
</template>
