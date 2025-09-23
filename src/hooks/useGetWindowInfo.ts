/**
 * 窗口信息
 */
export const useGetWindowInfo = () => {
    let obj: UniNamespace.GetWindowInfoResult | UniNamespace.GetSystemInfoResult;
    // #ifdef APP || H5 || MP-WEIXIN
    obj = uni.getWindowInfo();
    // #endif
    // #ifndef APP || H5 || MP-WEIXIN
    obj = uni.getSystemInfoSync();
    // #endif
    return obj;
};
