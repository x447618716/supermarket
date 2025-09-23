/**
 * 广告banner
 */
export interface BannerVo {
    /**
     * 外链地址
     */
    href?: string;
    /**
     * 标识
     */
    id: string;
    /**
     * 类型：0:纯图片 1:外链
     */
    type: number;
    /**
     * 图片地址
     */
    url: string;
}

/**
 * 商品分类
 */
export interface GoodsCategoryVo {
    /**
     * 分类图标
     */
    icon: string;
    /**
     * 标识
     */
    id: string;
    /**
     * 分类名称
     */
    name: string;
}

/**
 * 推荐
 */
export interface RecommendVo {
    /**
     * 标签
     */
    label: string;
    /**
     * 标识
     */
    id: string;
    /**
     * 推荐列表
     */
    items: GoodsVo[];
    /**
     * 推荐标题
     */
    title: string;
}

/**
 * 商品
 */
export interface GoodsVo {
    /**
     * 标识
     */
    id: string;
    /**
     * 商品图片
     */
    image: string;
    /**
     * 商品名称
     */
    name: string;
    /**
     * 价格
     */
    price: number;
    /**
     * 数据类型： 1为商品 2为广告
     */
    type: string;
    /**
     * 零售单元 如：箱 | 份 | 盒
     */
    unit: string;
}

/**
 * 商品列表
 */
export interface GoodsItemsVo {
    /**
     * 数据列表
     */
    items: GoodsVo[];
    /**
     * 总数
     */
    total: number;
}
