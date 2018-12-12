/**
 * 校园空兼 - StatusCode
 * http://menger.me
 * UpdateTime: 2017/12/25 14:55
 * @大梦
 */

module.exports = {
	// 2xxxx 请求成功
	SUCCESS: {code: 20000, msg: '请求成功'},

	// 4xxxx 请求失败
	FAIL: {code: 40000, msg: '请求失败'},
	NOT_FOUND: {code: 40400, msg: '请求地址未找到，请确认信息'},
    TOKEN_EXPIRED: {code: 40100, msg: 'Token已过期，请重新登录'},

    // 5xxxx 服务器出错
	SERVER_ERROR: {code: 50000, msg: '服务器请求失败，请稍后重试'},
};