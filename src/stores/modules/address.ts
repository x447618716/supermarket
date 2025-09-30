import { defineStore } from 'pinia';

export const useAddressStore = defineStore(
    'addressStore',
    () => {
        const addressList = ref([]);

        return {
            addressList
        };
    },
    {
        persist: true
    }
);
