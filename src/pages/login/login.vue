<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { storeToRefs } from 'pinia';
import { useRouter } from 'uni-mini-router';
import { ref, reactive, computed } from 'vue';

import qq from '@/assets/image/login/QQ@2x.png';
import wechat from '@/assets/image/login/weChat@2x.png';
import { NumberEnum } from '@/enums/numberEnum';
import { login } from '@/services/api/auth';
import { useAuthStore } from '@/stores/modules/auth';
import { Toast } from '@/utils/uniapi/prompt';

const authStore = useAuthStore();
const router = useRouter();
const { accountInfo, accessToken, refreshToken, expiresAt } = storeToRefs(authStore);

const form = reactive<Parameters<typeof login>[0]>({
    account: '',
    password: '',
    code: '',
    type: 2
});
const codeText = ref('获取验证码');

const isDisabled = computed(() => form.account && form.code);

const codeCss = computed(() => {
    if (form.account) {
        if (codeText.value === '获取验证码') {
            return 'text-[#E9B921]';
        } else {
            return codeText.value === '重新获取' ? 'text-[#40AE36]' : 'text-[#CCC8C8]';
        }
    } else {
        return 'text-[#CCC8C8]';
    }
});

onLoad(() => {
    //检查记住密码状态
    if (accountInfo.value.remembered) {
        form.account = accountInfo.value.account;
        form.password = accountInfo.value.password;
        form.type = accountInfo.value.type;
    }
});

// 登录方法
const handleSubmit = () => {
    if (!isDisabled.value) {
        return;
    }
    if (form.account === '') {
        Toast('请输入手机号！');
        return;
    }
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(form.account)) {
        Toast('手机号错误！');
        return;
    }
    if (form.code === '') {
        Toast('请输入验证码！');
        return;
    }
    void login(form).then(res => {
        accountInfo.value.account = form.account;
        accountInfo.value.password = form.password;
        accountInfo.value.type = form.type;
        accessToken.value = res.data.accessToken;
        refreshToken.value = res.data.refreshToken;
        expiresAt.value = res.data.expiresAt;
        router.pushTab('/pages/home/home');
    });
};

const handleSendSMS = () => {
    if (codeText.value !== '获取验证码' && codeText.value !== '重新获取') {
        return;
    }
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(form.account)) {
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
            <view class="pt-[100rpx] pb-[100rpx] font-PingFangSC-Semibold text-[48rpx] text-[#262424]">手机号码登录</view>
            <view class="flex w-full items-center border-b border-[#F0F0F0]">
                <input
                    v-model="form.account"
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
            <view class="flex h-[100rpx] items-center justify-center gap-1.5" @click="router.push('/pages/register/register')">
                <text class="text-[28rpx] font-normal text-[#666262]">新用户注册</text>
                <uni-icons type="right" color="#262424" size="15" />
            </view>
        </view>
        <view class="flex items-center justify-center text-[26rpx] text-[#999393]">其他登录方式</view>
        <view class="flex h-[200rpx] items-center justify-around gap-10">
            <image class="block h-[100rpx] w-[100rpx] rounded-full" :src="qq" />
            <image class="block h-[100rpx] w-[100rpx] rounded-full" :src="wechat" />
        </view>
    </view>
</template>

<style lang="css">
page {
    width: 100%;
    height: 100%;
}
</style>
