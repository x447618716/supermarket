import pagesJson from '@/pages.json';

const { globalStyle, pages } = pagesJson;
/**
 * 全局样式
 */
export const useGlobalStyle = () => {
    const currentPages = getCurrentPages();
    const path = currentPages[currentPages.length - 1]?.route;
    const route = pages.find(item => item.path === path);

    if (route) {
        return {
            navigationBarTextStyle: route.style.navigationBarTextStyle ?? globalStyle.navigationBarTextStyle,
            navigationBarTitleText: route.style.navigationBarTitleText ?? globalStyle.navigationBarTitleText,
            navigationBarBackgroundColor: route.style.navigationBarBackgroundColor ?? globalStyle.backgroundColor
        };
    } else {
        const { navigationBarTextStyle, navigationBarTitleText, navigationBarBackgroundColor } = globalStyle;
        return {
            navigationBarTextStyle,
            navigationBarTitleText,
            navigationBarBackgroundColor
        };
    }
};
