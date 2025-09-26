<script setup lang="ts">
const prop = defineProps<{
    text: string;
}>();

const router = useRouter();

const statusBarHeight = ref(useGetWindowInfo().statusBarHeight);
const activeType = ref<1 | 2 | 3>(1);
const priceSort = ref<1 | 2 | 3>(1);
const init = ref(false);
const goodsList = ref<GoodsVo[]>([]);
const pageNo = ref(1);
const total = ref(0);

const customNavHeight = computed(() => {
    if (statusBarHeight.value) {
        return 44 + statusBarHeight.value;
    } else {
        return 44;
    }
});

onLoad(() => {
    handleGetGoodsItems();
});

onReachBottom(() => {
    if (goodsList.value.length < total.value) {
        pageNo.value++;
        handleGetGoodsItems();
    }
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

const handleSearchClick = () => {
    if (!init.value) {
        router.replace({ path: '/pages/search/search', query: { text: prop.text } });
    }
};

const handleSearchClear = () => {
    init.value = true;
    router.replace('/pages/search/search');
};

const handleChangeType = (type: number) => {
    switch (type) {
        case 1: {
            priceSort.value = 1;
            activeType.value = 1;
            break;
        }
        case 2: {
            activeType.value = 2;
            if (priceSort.value === 1) {
                priceSort.value = 2;
            } else if (priceSort.value === 2) {
                priceSort.value = 3;
            } else {
                priceSort.value = 1;
                activeType.value = 1;
            }
            break;
        }
        case 3: {
            if (activeType.value === 3) {
                activeType.value = 1;
            } else {
                activeType.value = 3;
            }
            break;
        }
        default: {
            priceSort.value = 1;
            activeType.value = 1;
            break;
        }
    }
};
</script>

<template>
    <u-navbar fixed placeholder auto-back bg-color="#F8F9FA" @right-click="router.pushTab('/pages/cart/cart')">
        <template #center>
            <view class="m-auto w-9/12">
                <u-search
                    disabled
                    clearabled
                    :only-clearable-on-focused="false"
                    :model-value="prop.text"
                    bg-color="#fff"
                    :show-action="false"
                    @tap="handleSearchClick"
                    @clear="handleSearchClear" />
            </view>
        </template>
        <template #right>
            <x-cart-icon />
        </template>
    </u-navbar>
    <view class="p-[20rpx_30rpx]">
        <u-sticky :custom-nav-height="customNavHeight">
            <view class="flex items-center justify-around bg-white p-3">
                <view class="text-[26rpx] font-normal" @tap="handleChangeType(1)" :class="[activeType === 1 ? 'text-[#40AE36]' : 'text-[#666]']">综合</view>
                <view class="flex items-center gap-1" @tap="handleChangeType(2)">
                    <view class="text-[26rpx] font-normal" :class="[activeType === 2 ? 'text-[#40AE36]' : 'text-[#666]']">价格</view>
                    <view class="flex flex-col">
                        <u-icon name="arrow-up-fill" size="6" :color="priceSort === 2 ? '#40AE36' : '#666'" />
                        <u-icon name="arrow-down-fill" size="6" :color="priceSort === 3 ? '#40AE36' : '#666'" />
                    </view>
                </view>
                <view class="flex items-center gap-1" @tap="handleChangeType(3)">
                    <view class="text-[26rpx] font-normal" :class="[activeType === 3 ? 'text-[#40AE36]' : 'text-[#666]']">销量</view>
                    <u-icon name="arrow-downward" size="14" :color="activeType === 3 ? '#40AE36' : '#666'" />
                </view>
            </view>
        </u-sticky>
        <x-goods-list :goods-list="goodsList" />
    </view>
</template>

<style lang="css">
page {
    width: 100%;
    min-height: 100%;
    background: white;
}
</style>
