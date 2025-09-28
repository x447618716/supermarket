<script setup lang="ts">
interface Sku {
    num: number;
    selectedText: string;
}

interface SwiperType {
    current: number;
}

const props = defineProps<{
    id: string;
}>();

const router = useRouter();

const list6 = ref([
    {
        url: 'http://cdn.xierongsheng.cn/5%402x.png'
    }
]);
const currentNum = ref(0);

// 商品信息
const goodsInfo = ref({
    image: 'https://picsum.photos/200/200',
    price: 99.0,
    stock: 100
});

// SKU树形结构
const skuTree = ref([
    {
        label: '颜色',
        name: 'color',
        children: [
            { id: 1, name: '红色' },
            { id: 2, name: '蓝色' },
            { id: 3, name: '黑色' }
        ]
    },
    {
        label: '尺寸',
        name: 'size',
        children: [
            { id: 1, name: 'S' },
            { id: 2, name: 'M' },
            { id: 3, name: 'L' },
            { id: 4, name: 'XL' }
        ]
    }
]);

// SKU列表
const skuList = ref([
    {
        id: 1,
        color: 1,
        size: 1,
        price: 99.0,
        stock: 50
    },
    {
        id: 2,
        color: 1,
        size: 2,
        price: 99.0,
        stock: 40
    },
    {
        id: 3,
        color: 2,
        size: 1,
        price: 109.0,
        stock: 30
    },
    {
        id: 4,
        color: 2,
        size: 3,
        price: 109.0,
        stock: 20
    },
    {
        id: 5,
        color: 3,
        size: 4,
        price: 89.0,
        stock: 60
    }
]);

onLoad(() => {
    console.log(props.id);
});

const handleSwiperChange = (e: SwiperType) => {
    currentNum.value = e.current;
};

const confirmSku = (e: Sku) => {
    void uni.showToast({
        title: `选择了: ${e.selectedText}, 数量: ${e.num}`,
        icon: 'none'
    });
};
</script>

<template>
    <u-navbar auto-back fixed placeholder bg-color="#fff">
        <template #center>
            <view class="flex w-full items-center justify-end gap-1 p-2.5">
                <u-icon name="share-square" size="24" color="rgb(144, 147, 153)" />
                <x-cart-icon @tap="router.pushTab('/pages/cart/cart')" />
            </view>
        </template>
    </u-navbar>
    <u-swiper :list="list6" bg-color="#fff" height="540rpx" @change="handleSwiperChange" :autoplay="false" indicator-style="right: 20px">
        <template #default="{ item }">
            <view class="flex items-center justify-center">
                <image :src="item.url" mode="aspectFit" />
            </view>
        </template>
        <template #indicator>
            <view class="flex h-[40rpx] w-[78rpx] items-center justify-center rounded-xl bg-[#A6A6A6]">
                <text class="text-[22rpx] font-normal text-white">{{ currentNum + 1 }}/{{ list6.length }}</text>
            </view>
        </template>
    </u-swiper>

    <view class="m-auto mt-3 flex w-11/12 flex-col gap-2 rounded-xl bg-white p-2">
        <view class="flex items-center justify-between">
            <view class="flex gap-0.5">
                <view>
                    <text class="font-PingFangSC-Medium text-[22rpx] text-[#F55726]">￥</text>
                    <text class="font-PingFangSC-Semibold text-[42rpx] text-[#F55726]">39.8</text>
                    <text class="text-[22rpx] text-[#999]">/份</text>
                </view>
                <text class="self-end text-[22rpx] text-[#ccc] line-through">￥45.8份</text>
            </view>
            <view class="flex items-center gap-1">
                <view class="border border-[#ccc] text-[18rpx] text-[#999]">入口即化</view>
                <view class="border border-[#ccc] text-[18rpx] text-[#999]">好吃不腻</view>
            </view>
        </view>
        <view class="font-PingFangSC-Medium text-[36rpx] text-[#333]">四川眉山 爱媛38号可吸的果冻橙礼盒装12粒(单果180g+)</view>
        <view class="flex items-center gap-1">
            <view class="rounded-[6rpx] bg-[#40AE36] p-0.5 font-PingFangSC-Medium text-[22rpx] text-white">产地量贩</view>
            <view class="text-[22rpx] text-[#666]">基地优选</view>
            <view class="text-[22rpx] text-[#666]">售后无忧</view>
        </view>
    </view>

    <view class="m-auto mt-3 flex w-11/12 items-center justify-between rounded-xl bg-white p-3">
        <view class="flex items-center gap-2">
            <view class="font-PingFangSC-Medium text-[26rpx] text-[#333]">已选</view>
            <view class="text-[26rpx] text-[#333]">0.5kg/份</view>
        </view>
        <u-goods-sku :goods-info="goodsInfo" :sku-tree="skuTree" :sku-list="skuList" :max-buy="10" @confirm="confirmSku">
            <template #trigger>
                <u-icon name="arrow-right" size="14" />
            </template>
        </u-goods-sku>
    </view>

    <view class="m-auto mt-3 flex w-11/12 items-center justify-between rounded-xl bg-white p-3">
        <view class="font-PingFangSC-Medium text-[26rpx] text-[#333]">
            <text>用户评价</text>
            <text class="text-[22rpx] text-[#999]">(1560)</text>
        </view>
        <view class="flex items-center gap-1">
            <view class="text-[24rpx] text-[#666]">查看全部</view>
            <u-icon name="arrow-right" size="14" />
        </view>
    </view>

    <view class="m-auto mt-3 w-11/12 rounded-xl bg-white p-3">
        <view class="mb-2 font-PingFangSC-Medium text-[26rpx] text-[#333]">规格信息</view>
        <view class="flex items-center border border-[#ECECEC]">
            <view class="w-[156rpx] bg-[#F8F9FA] p-2 text-[24rpx] text-[#666]">产地</view>
            <view class="bg-white p-2 text-[24rpx] text-[#333]">安徽</view>
        </view>
        <view class="flex items-center border border-t-0 border-[#ECECEC]">
            <view class="w-[156rpx] bg-[#F8F9FA] p-2 text-[24rpx] text-[#666]">规格</view>
            <view class="bg-white p-2 text-[24rpx] text-[#333]">180g+份</view>
        </view>
        <view class="flex items-center border border-t-0 border-[#ECECEC]">
            <view class="w-[156rpx] bg-[#F8F9FA] p-2 text-[24rpx] text-[#666]">保质期</view>
            <view class="bg-white p-2 text-[24rpx] text-[#333]">30天</view>
        </view>
        <view class="flex items-center border border-t-0 border-[#ECECEC]">
            <view class="w-[156rpx] bg-[#F8F9FA] p-2 text-[24rpx] text-[#666]">存储方式</view>
            <view class="bg-white p-2 text-[24rpx] text-[#333]">冷藏</view>
        </view>
    </view>

    <view class="mt-3 bg-white p-3 pb-20">
        <image class="h-auto w-full" src="http://cdn.xierongsheng.cn/details%402x.png" mode="widthFix" />
    </view>

    <view class="fixed bottom-0 flex w-full items-center justify-around bg-white p-2">
        <view class="flex flex-col items-center justify-center">
            <u-icon name="heart" size="20" />
            <view class="text-[18rpx] text-[#333]">收藏</view>
        </view>
        <view class="flex flex-col items-center justify-center">
            <u-icon name="kefu-ermai" size="20" />
            <view class="text-[18rpx] text-[#333]">客服</view>
        </view>
        <view class="flex h-[70rpx] w-[500rpx] items-center justify-center rounded-3xl bg-[#40AE36] text-[26rpx] text-white">加入购物车</view>
    </view>
</template>
