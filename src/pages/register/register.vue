<script setup lang="ts">
const router = useRouter();

const form = reactive<Parameters<typeof register>[0]>({
    phone: '',
    code: '',
    name: ''
});
const codeText = ref('获取验证码');

const isDisabled = computed(() => form.phone && form.code && form.name);

const codeCss = computed(() => {
    if (form.phone) {
        if (codeText.value === '获取验证码') {
            return 'text-[#E9B921]';
        } else {
            return codeText.value === '重新获取' ? 'text-[#40AE36]' : 'text-[#CCC8C8]';
        }
    } else {
        return 'text-[#CCC8C8]';
    }
});

// 注册方法
const handleSubmit = () => {
    if (!isDisabled.value) {
        return;
    }
    if (form.name === '') {
        Toast('请输入用户名');
        return;
    }
    if (form.phone === '') {
        Toast('请输入手机号！');
        return;
    }
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(form.phone)) {
        Toast('手机号错误！');
        return;
    }
    if (form.code === '') {
        Toast('请输入验证码！');
        return;
    }
    void register(form).then(() => {
        router.back();
    });
};

const handleSendSMS = () => {
    if (codeText.value !== '获取验证码' && codeText.value !== '重新获取') {
        return;
    }
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(form.phone)) {
        Toast('手机号错误！');
        return;
    }
    let times = NumberEnum.TIME_COUNT_SECOND;
    codeText.value = `${times}s后重新获取`;
    const timer = setInterval(() => {
        times--;
        if (times < 1) {
            clearInterval(timer);
            codeText.value = '重新获取';
            return;
        }
        codeText.value = `${times}s后重新获取`;
    }, NumberEnum.INTERVAL_TIME);
};
</script>

<template>
    <view class="relative flex size-full flex-col items-center pr-[60rpx] pl-[60rpx]">
        <view class="w-full flex-1">
            <view class="pt-[100rpx] pb-[100rpx] font-PingFangSC-Semibold text-[48rpx] text-[#262424]">注册</view>
            <view class="flex w-full items-center border-b border-[#F0F0F0]">
                <input
                    v-model="form.name"
                    class="h-[110rpx] w-full text-[30rpx] font-normal text-[#262424]"
                    type="text"
                    placeholder="请输入用户名"
                    placeholder-class="text-[30rpx] font-normal text-[#CCC8C8]" />
            </view>
            <view class="flex w-full items-center border-b border-[#F0F0F0]">
                <input
                    v-model="form.phone"
                    class="h-[110rpx] w-full text-[30rpx] font-normal text-[#262424]"
                    type="text"
                    placeholder="请输入手机号码"
                    placeholder-class="text-[30rpx] font-normal text-[#CCC8C8]" />
            </view>
            <view class="flex w-full items-center border-b border-[#F0F0F0]">
                <input
                    v-model="form.code"
                    class="h-[110rpx] w-full text-[30rpx] font-normal text-[#262424]"
                    type="password"
                    placeholder="请输入手机验证码"
                    placeholder-class="text-[30rpx] font-normal text-[#CCC8C8]" />
                <view :class="codeCss" class="flex w-[250rpx] justify-center text-[24rpx] font-normal" @click="handleSendSMS">{{ codeText }}</view>
            </view>
            <view
                class="mt-[126rpx] flex h-[82rpx] w-[630rpx] items-center justify-center rounded-3xl font-PingFangSC-Semibold text-[30rpx] font-normal text-white"
                :class="[isDisabled ? 'bg-[#40AE36]' : 'bg-[#8CCE86]']"
                @click="handleSubmit">
                登录
            </view>
            <view class="flex h-[100rpx] items-center justify-center gap-1.5" @click="router.replaceAll('/pages/login/login')">
                <text class="text-[28rpx] font-normal text-[#666262]">已注册，去登录</text>
                <u-icon name="arrow-right" color="#262424" size="15" />
            </view>
        </view>
    </view>
</template>

<style lang="css">
page {
    width: 100%;
    height: 100%;
    background-color: white;
}
</style>
