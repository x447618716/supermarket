<script setup lang="ts">
import search from '@/assets/image/icon/search@2x.png';

const router = useRouter();
const scrollText = ref<string[]>([]);

onMounted(() => {
    void hotSearchTerms().then(res => {
        scrollText.value = res.data;
    });
});

const handleToSearch = (index: number) => {
    router.push({ path: '/pages/search/search', query: { placeholderText: scrollText.value[index] ?? '' } });
};
</script>

<template>
    <view class="flex h-[80rpx] w-full items-center rounded-3xl bg-[#EDEFF2] pl-3">
        <image class="h-4 w-4" :src="search" mode="aspectFill" />
        <u-notice-bar icon="" bg-color="transparent" color="#999999" :text="scrollText" direction="column" @click="handleToSearch" />
    </view>
</template>
