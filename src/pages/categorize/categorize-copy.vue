<script setup lang="ts">
interface EventHandle {
    detail: Scroll;
}
interface Scroll {
    scrollTop: number;
}

const prop = defineProps<{
    categoryId?: string;
}>();

const router = useRouter();
const statusBarHeight = ref(useGetWindowInfo().statusBarHeight);

const goodsCategoryList = ref<GoodsCategoryVo[]>([]);
const currentCategory = ref('');
const currentType = ref(0);
const currentLabel = ref<number>(0);
const goodsList = ref<GoodsVo[]>([]);
const pageNo = ref(1);
const total = ref(0);

const show = ref(true);
const scrollTop = ref(0);

const list = ref(['全部', '热带水果', '樱桃梅类', '柑橘橙柚', '苹果梨蕉', '奇异果', '瓜类葡萄', '茄果', '菌菇', '葱姜蒜']);

onLoad(() => {
    void getGoodsCategory().then(res => {
        goodsCategoryList.value = res.data;
        if (res.data.length > 0 && !prop.categoryId) {
            currentCategory.value = res.data[0]?.id ?? '';
        }
    });
    if (prop.categoryId) {
        currentCategory.value = prop.categoryId;
    }
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

const handleScrolltolower = () => {
    if (goodsList.value.length < total.value) {
        pageNo.value++;
        handleGetGoodsItems();
    }
};

const handleScroll = (e: EventHandle) => {
    scrollTop.value = e.detail.scrollTop;
};
</script>

<template>
    <u-navbar
        :left-icon="prop.categoryId ? 'arrow-left' : ''"
        :auto-back="!!prop.categoryId"
        placeholder
        bg-color="#F8F9FA"
        @right-click="router.pushTab('/pages/cart/cart')">
        <template #center>
            <view class="w-9/12">
                <x-search-bar class="h-[35px]! bg-white!" />
            </view>
        </template>
        <template #right>
            <x-cart-icon />
        </template>
    </u-navbar>
    <!--商品分类-->
    <u-scroll-list :indicator="false">
        <view class="flex h-[180rpx] items-center">
            <view class="p-3" v-for="item in goodsCategoryList" :key="item.id" @tap="currentCategory = item.id">
                <image
                    class="h-[108rpx] w-[108rpx] rounded-[50%]"
                    :class="{ 'border-2 border-[#40AE36]': currentCategory === item.id }"
                    :src="item.icon"
                    mode="aspectFill" />
                <view class="p-0.5 text-[24rpx]" :class="currentCategory === item.id ? 'rounded-xl bg-[#40AE36] text-[#fff]' : 'text-[#666]'">
                    {{ item.name }}
                </view>
            </view>
        </view>
    </u-scroll-list>
    <view class="relative flex w-full" :style="{ height: `calc(100% - 44px - 200rpx - ${statusBarHeight}px)` }">
        <scroll-view class="h-full w-[180rpx] bg-[#F8F9FA]" scroll-y>
            <view
                class="flex h-[110rpx] w-full items-center justify-center font-PingFangSC-Medium text-[28rpx] font-normal"
                :class="[currentType === index ? 'bg-white text-[#40AE36]' : 'text-[#666]']"
                @tap="currentType = index"
                v-for="(item, index) in list"
                :key="index">
                {{ item }}
            </view>
        </scroll-view>
        <scroll-view class="size-full bg-white" :scroll-y="show" @scroll="handleScroll" @scrolltolower="handleScrolltolower">
            <view v-show="!show" class="absolute z-1000 size-full bg-[rgba(0,0,0,0.2)]" :style="{ top: `${scrollTop}px` }" @tap="show = !show">
                <view class="w-full bg-white">
                    <view class="flex items-center justify-between p-2">
                        <view class="font-PingFangSC-Medium text-[26rpx] font-normal text-[#333]">全部分类</view>
                        <up-icon name="arrow-up" />
                    </view>
                    <view class="flex flex-wrap gap-2 p-2">
                        <view
                            class="min-w-[156rpx] rounded-[6rpx] p-2 text-center text-[24rpx] font-normal"
                            :class="[currentLabel === index ? 'bg-[#D9EFD7] text-[#333]' : 'bg-[#EDEFF2] text-[#666]']"
                            v-for="(item, index) in list"
                            :key="index"
                            @tap="currentLabel = index">
                            {{ item }}
                        </view>
                    </view>
                </view>
            </view>
            <view>
                <u-sticky custom-nav-height="0">
                    <view class="flex items-center justify-between bg-white p-2">
                        <scroll-view :scroll-into-view="`z${currentLabel}`" scroll-with-animation class="w-[520rpx]" scroll-x style="white-space: nowrap">
                            <view
                                :id="`z${index}`"
                                class="mr-2 inline-block w-fit rounded-[6rpx] p-1 text-[24rpx] font-normal"
                                :class="[currentLabel === index ? 'bg-[#D9EFD7] text-[#333]' : 'bg-[#EDEFF2] text-[#666]']"
                                v-for="(item, index) in list"
                                :key="index"
                                @tap="currentLabel = index">
                                {{ item }}
                            </view>
                        </scroll-view>
                        <view class="flex items-center justify-center pl-2 shadow-[-1px_0_0_0_#E5E2E2]">
                            <u-icon name="arrow-down" @tap="show = !show" />
                        </view>
                    </view>
                </u-sticky>
                <x-goods-list :goods-list="goodsList" />
            </view>
        </scroll-view>
    </view>
</template>

<style lang="css">
page {
    width: 100%;
    height: 100%;
}
</style>
