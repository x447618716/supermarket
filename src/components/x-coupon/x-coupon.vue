<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        pageInline: boolean;
        closeable: boolean;
    }>(),
    {
        pageInline: false,
        closeable: true
    }
);

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
        <u-popup v-model:show="show" mode="bottom" :closeable="props.pageInline ? false : closeable" :page-inline="pageInline">
            <view class="flex items-center justify-center p-3 font-PingFangSC-Medium text-[32rpx] text-[#333]">选择优惠卷</view>
            <view class="p-6">
                <view class="flex flex-col gap-3">
                    <u-coupon :amount="50" unit="元" title="新人红包" desc="限时专享" shape="envelope" type="warning" />
                    <u-coupon :amount="20" title="满减券" size="small" action-text="去使用" />
                    <u-coupon
                        disabled
                        :amount="200"
                        unit="￥"
                        title="大额优惠券"
                        desc="仅限VIP用户"
                        limit="满500可用"
                        time="有效期至2023-12-31"
                        size="large"
                        type="error" />
                </view>
                <view
                    class="mt-5 flex h-[90rpx] w-[630rpx] items-center justify-center rounded-3xl border border-[#e2e2e2] text-[30rpx] text-black"
                    @tap="show = false">
                    不使用优惠卷
                </view>
            </view>
        </u-popup>
    </view>
</template>
