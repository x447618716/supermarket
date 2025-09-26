import { defineStore } from 'pinia';

export const useSearchStore = defineStore(
    'searchStore',
    () => {
        const searchList = ref<string[]>([]);
        const addSearchText = (text: string) => {
            if (!searchList.value.includes(text)) {
                searchList.value.push(text);
            }
        };
        const deleteSearchTextAll = () => {
            searchList.value = [];
        };
        return {
            searchList,
            addSearchText,
            deleteSearchTextAll
        };
    },
    {
        persist: true
    }
);
