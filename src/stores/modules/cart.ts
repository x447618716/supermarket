import { defineStore } from 'pinia';

export interface CartType extends GoodsVo {
    /**
     * 数量
     * */
    num: number;
    /**
     * 购物车选中状态
     * */
    select: boolean;
}

export const useCartStore = defineStore(
    'cartStore',
    () => {
        const cartList = ref<CartType[]>([]);

        const isSelectItem = computed(() => cartList.value.some(item => item.select));

        const totalPrice = computed(() => {
            const selectItemALL = cartList.value.filter(item => item.select);
            return selectItemALL.reduce((result, item) => result + item.price, 0);
        });

        const addCart = (item: GoodsVo) => {
            Object.assign(item, { num: 1, select: false });
            cartList.value.push(item as CartType);
        };

        const deleteItemById = (id: string) => {
            const index = cartList.value.findIndex(item => item.id === id);
            if (index !== -1) {
                cartList.value.splice(index, 1);
            }
        };

        const deleteSelectItemAll = () => {
            const selectItemALL = cartList.value.filter(item => item.select);
            selectItemALL.forEach(item => {
                deleteItemById(item.id);
            });
        };

        return {
            cartList,
            isSelectItem,
            totalPrice,
            addCart,
            deleteItemById,
            deleteSelectItemAll
        };
    },
    {
        persist: true
    }
);
