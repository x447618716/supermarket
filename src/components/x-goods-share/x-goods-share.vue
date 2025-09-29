<script setup lang="ts">
import qq from '@/assets/image/qq@2x.png';
import wechatCircle from '@/assets/image/wechat-circle@2x.png';
import wechat from '@/assets/image/wechat@2x.png';
import weibo from '@/assets/image/weibo@2x.png';

const emit = defineEmits<{ open: [] }>();

const show = ref(false);

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
            <view class="flex items-center justify-center p-3 font-PingFangSC-Medium text-[32rpx] text-[#333]">分享到</view>
            <view class="p-6">
                <view class="flex items-center justify-around">
                    <view class="flex flex-col items-center gap-0.5">
                        <image class="h-[100rpx] w-[100rpx]" :src="wechat" mode="widthFix" />
                        <view class="font-PingFangSC-Light text-[26rpx] text-[#8B8A99]">微信</view>
                    </view>
                    <view class="flex flex-col items-center gap-0.5">
                        <image class="h-[100rpx] w-[100rpx]" :src="wechatCircle" mode="widthFix" />
                        <view class="font-PingFangSC-Light text-[26rpx] text-[#8B8A99]">朋友圈</view>
                    </view>
                    <view class="flex flex-col items-center gap-0.5">
                        <image class="h-[100rpx] w-[100rpx]" :src="qq" mode="widthFix" />
                        <view class="font-PingFangSC-Light text-[26rpx] text-[#8B8A99]">QQ</view>
                    </view>
                    <view class="flex flex-col items-center gap-0.5">
                        <image class="h-[100rpx] w-[100rpx]" :src="weibo" mode="widthFix" />
                        <view class="font-PingFangSC-Light text-[26rpx] text-[#8B8A99]">微博</view>
                    </view>
                </view>
                <view class="mt-5 flex h-[90rpx] w-[630rpx] items-center justify-center rounded-3xl border border-[#e2e2e2] text-[30rpx] text-black">
                    取消分享
                </view>
            </view>
        </u-popup>
    </view>
</template>
