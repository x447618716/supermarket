<script setup lang="ts">
import { storeToRefs } from 'pinia';

const prop = defineProps<{
    placeholderText?: string;
    text?: string;
}>();

const router = useRouter();
const searchStore = useSearchStore();
const { addSearchText, deleteSearchTextAll } = searchStore;
const { searchList } = storeToRefs(searchStore);

const searchText = ref(prop.text ?? '');
const scrollText = ref<string[]>([]);

onLoad(() => {
    void hotSearchTerms().then(res => {
        scrollText.value = res.data;
    });
});

const placeholder = computed(() => {
    return prop.placeholderText ?? scrollText.value[0] ?? '';
});

const handleSearch = () => {
    if (searchText.value.length) {
        if (searchText.value.trim().length) {
            addSearchText(searchText.value);
            router.push({ path: '/pages/search-result/search-result', query: { text: searchText.value } });
        }
    } else {
        if (placeholder.value.length) {
            addSearchText(placeholder.value);
            router.push({ path: '/pages/search-result/search-result', query: { text: placeholder.value } });
        }
    }
};

const handleDelete = () => {
    void Modal({
        content: '确定要删除全部搜索历史?',
        confirmColor: '#40AE36'
    }).then(result => {
        if (result.confirm) {
            deleteSearchTextAll();
        }
    });
};

const handleSearchValue = (value: string) => {
    addSearchText(value);
    router.push({ path: '/pages/search-result/search-result', query: { text: value } });
};
</script>

<template>
    <u-navbar fixed placeholder auto-back bg-color="#F8F9FA" @right-click="router.pushTab('/pages/cart/cart')">
        <template #center>
            <view class="m-auto w-9/12">
                <u-search v-model="searchText" bg-color="#fff" :placeholder="placeholder" :show-action="false" @search="handleSearch" />
            </view>
        </template>
        <template #right>
            <x-cart-icon />
        </template>
    </u-navbar>
    <view class="p-[20rpx_30rpx]">
        <view class="flex items-center justify-between">
            <view class="font-PingFangSC-Semibold text-[30rpx] font-normal text-[#333]">历史搜索</view>
            <u-icon name="trash" color="#999" size="20" @tap="handleDelete" />
        </view>
        <view class="flex flex-wrap items-center gap-1.5 p-3">
            <view
                class="w-fit rounded-xl bg-[#F8F9FA] pt-1.5 pr-2.5 pb-1.5 pl-2.5 text-[22rpx] whitespace-nowrap text-[#666]"
                v-for="(item, index) in searchList"
                :key="index"
                @tap="handleSearchValue(item)">
                {{ item }}
            </view>
        </view>
        <view class="flex items-center justify-between">
            <view class="font-PingFangSC-Semibold text-[30rpx] font-normal text-[#333]">实时热搜</view>
        </view>
        <view class="flex flex-wrap items-center gap-1.5 p-3">
            <view
                class="w-fit rounded-xl bg-[#F8F9FA] pt-1.5 pr-2.5 pb-1.5 pl-2.5 text-[22rpx] whitespace-nowrap text-[#666]"
                v-for="(item, index) in scrollText"
                :key="index"
                @tap="handleSearchValue(item)">
                {{ index + 1 }} {{ item }}
            </view>
        </view>
    </view>
</template>

<style lang="css">
page {
    width: 100%;
    min-height: 100%;
    background: white;
}
</style>
