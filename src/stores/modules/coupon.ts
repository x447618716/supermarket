import { defineStore } from 'pinia';

export const useCouponsStore = defineStore(
    'couponsStore',
    () => {
        const couponList = ref([]);

        return {
            couponList
        };
    },
    {
        persist: true
    }
);
