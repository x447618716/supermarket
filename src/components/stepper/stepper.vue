<script setup lang="ts">
import { storeToRefs } from 'pinia';

import cart from '@/assets/image/icon/cart@2x.png';
import type { CartType } from '@/stores/modules/cart';
import { useCartStore } from '@/stores/modules/cart';

const props = withDefaults(
    defineProps<{
        goods: GoodsVo;
        isShowCartIcon?: boolean;
        isShowDeleteTips?: boolean;
    }>(),
    {
        isShowCartIcon: true,
        isShowDeleteTips: false
    }
);

const cartStore = useCartStore();
const { addCart, deleteItemById } = cartStore;
const { cartList } = storeToRefs(cartStore);

const goodsItem = ref<CartType>();

watchEffect(() => {
    goodsItem.value = cartList.value.find(item => item.id === props.goods.id);
});

const handleAddToCart = () => {
    addCart(props.goods);
};

const handleDeleteToCart = () => {
    if (props.isShowDeleteTips) {
        void Modal({
            content: '确定要删除该商品么?',
            confirmColor: '#40AE36'
        }).then(result => {
            if (result.confirm) {
                deleteItemById(props.goods.id);
            }
        });
    } else {
        deleteItemById(props.goods.id);
    }
};
</script>

<template>
    <template v-if="goodsItem">
        <u-number-box
            v-model="goodsItem.num"
            icon-style="font-size:12px"
            button-width="44rpx"
            button-size="44rpx"
            input-width="20"
            min="1"
            max="99"
            bg-color="#F8F9FA"
            color="#333"
            disabled-input
            input-bg-color="transparent"
            button-radius="100%"
            mini-mode
            integer>
            <template #minus v-if="goodsItem.num === 1">
                <view class="flex h-[44rpx] w-[44rpx] items-center justify-center rounded-[50%] bg-[#f8f9fa]">
                    <up-icon name="minus" color="#323233" size="12" bold @tap="handleDeleteToCart" />
                </view>
            </template>
        </u-number-box>
    </template>
    <template v-else>
        <image v-if="isShowCartIcon" class="h-[44rpx] w-[44rpx]" :src="cart" mode="aspectFill" @tap="handleAddToCart" />
    </template>
</template>
