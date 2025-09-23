import type { GoodsItemsDto } from '@/services/dto/home';
import type { GoodsItemsVo } from '@/services/vo/home';
import request from '@/utils/http';

/**
 * 首页广告Banner
 * */
export const getAdBanner = () => request.Get<BaseResponse<BannerVo[]>>('/ad/banners');

/**
 *  商品分类
 * */
export const getGoodsCategory = () => request.Get<BaseResponse<GoodsCategoryVo[]>>('/goods/category');

/**
 * 热搜词汇
 * */
export const hotSearchTerms = () => request.Get<BaseResponse<string[]>>('/hot/search/terms');

/**
 * 商品推荐
 * */
export const goodsRecommend = () => request.Get<BaseResponse<RecommendVo>>('/goods/recommend');

/**
 * 商品列表
 * */
export const goodsItems = (data: GoodsItemsDto) =>
    request.Get<BaseResponse<GoodsItemsVo>>('/goods/items', {
        params: data
    });
