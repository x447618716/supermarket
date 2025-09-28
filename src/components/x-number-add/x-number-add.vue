<script setup lang="ts">
import { storeToRefs } from 'pinia';

import cart from '@/assets/image/icon/cart@2x.png';
import type { CartType } from '@/stores/modules/cart';
import { useCartStore } from '@/stores/modules/cart';

const props = defineProps<{
    goods: GoodsVo;
}>();

const cartStore = useCartStore();
const { addCart } = cartStore;
const { cartList } = storeToRefs(cartStore);
const goodsItem = ref<CartType>();

watchEffect(() => {
    goodsItem.value = cartList.value.find(item => item.id === props.goods.id);
});

const handleAddToCart = () => {
    if (goodsItem.value) {
        goodsItem.value.num++;
    } else {
        addCart(props.goods);
    }
};
</script>

<template>
    <view class="relative h-[44rpx] w-[44rpx]" @tap.stop="handleAddToCart">
        <u-badge class="z-10" max="99" absolute :offset="[-5, -5]" :value="goodsItem?.num ?? 0" />
        <image class="size-full" :src="cart" mode="aspectFill" />
    </view>
</template>
