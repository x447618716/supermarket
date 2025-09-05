/**
 * 登录Dto
 */
export interface LoginDto {
    /**
     * 账号
     */
    account: string;
    /**
     * 验证码
     */
    code: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 登录类型：1-账号+密码 2-手机+验证码 3-邮箱+验证码
     */
    type: number;
}

/**
 * 刷新Dto
 * */
export interface RefreshDto {
    refreshToken: string;
}

/**
 * 注册Dto
 */
export interface RegisterDto {
    /**
     * 验证码
     */
    code: string;
    /**
     * 用户名
     */
    name: string;
    /**
     * 手机号
     */
    phone: string;
}
