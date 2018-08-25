/**
 * 校园空兼 - API
 * https://menger.me
 * UpdateTime: 2017/12/25 14:55
 * @大梦
 */

module.exports = {
    // 主域名
    // BASE_HOST: 'http://www.xiaoyuankj.com/api/',
    BASE_HOST: 'http://xykj.3todo.com/api/',
    // BASE_HOST: 'http://waimaobang.nididake.com/api/',

    // 人才列表
    RESUME: '/member_list',
    // 职位列表
    POSITION: '/position_list',
    // 配置项
    OPTIONS: '/options',

    // 首页信息
    index: 'index',
    // 获取资源
    getResource: 'get_resource',
    // 获取验证码
    getVerificationCode: 'send_sms',

    // 登录
    login: 'login',
    // 注册
    register: 'register',
    // 忘记密码
    retrievePassword: 'forget',

    // 工作首页
    jobs: 'jobs/index',
    // 工作详情页
    jobDetails: 'job_details',
    // 工作搜索主页
    job_search_form: 'job_search_form',
    // 工作搜索结果页
    job_search_list: 'job_search_list',
    // 工作报名
    job_application_submit: 'job_application_submit',
    // 报名时间段
    job_application_time: 'job_application_time',
    // 报名结果
    job_application_result: 'job_application_result',
    // 取消报名
    job_application_cancel: 'job_application_cancel',

    // 换购首页
    shoppingMall: 'shopping_mall/index',
    // 分类选项获取
    getCategory: 'categories',
    // 换购商品详情
    workGoodsDetails: 'work_goods_details',
    // 换购
    work_goods_buy: 'work_goods_buy',
    // 提交换购订单
    work_goods_payment: 'work_goods_payment',
    // 获取默认收货地址
    address: '获取默认收获地址',
    // 提交积分订单
    point_goods_payment: 'point_goods_payment',
    // 积分商城首页
    point_mall: 'point_mall/index',

    // 会员中心首页
    mine: 'my_index',
    // 文件上传
    upload: 'upload',
    // 身份证认证
    id_verify: 'id_verify',
    // 绑定紧急联系人
    bind_emergency: 'bind_emergency',
    // 手机实名认证
    mobile_verify: 'mobile_verify',
    // 我的资料
    my_details: 'my_details',
    // 我的订单
    my_orders: 'my_orders',
    // 订单详情
    order_details: 'order_details',
    // 确认收货
    receipt: 'receipt',
    // 退换货
    order_return: 'order_return',
    // 我的积分
    my_point: 'my_point',
    // 诚信体系
    credit_system: 'credit_system',
    // 工作台
    work_bench: 'work_bench',
    // 工作台工作详情
    work_bench_job_details: 'work_bench_job_details',
    // 异常申诉
    add_appeal: 'add_appeal',
    // 打卡
    job_sign: 'job_sign',
    // 分享app
    get_app_share: 'get_app_share',
    // 分享成功获取积分
    share_get_point: 'share_get_point',
    // 重置密码
    reset_password: 'reset_password',
    // 积分商品详情
    point_goods_details: 'point_goods_details',
    // 积分商品购买页面
    point_goods_buy: 'point_goods_buy',
    // 身份证照片验证（上传正面照的时候调用这个接口）
    id_verify_photo: 'id_verify_photo',
    // 我的工作报名详情
    my_job_application_details: 'my_job_application_details',

    // 我的消息
    systemMessage: 'my_news',
    // 清空消息
    emptyMessage: 'clean_news',
};