import { setCookie, isDev } from '@/common/utils/tools.js'

let JUId = 'e229f0e2-20ec-46ff-8d17-c6aa8d7fdf5f'

const beforeSend = (options) => {
	//在开发环境下，如果接口需要登录，则可以默认传入固定的testOpenIdCode（非微信环境）或sessionId（微信环境）以通过接口校验
	// if (isDev && options.url.indexOf('auth') > -1) {
	if (isDev) {
		/*  options.data.cookieOpenId = testOpenIdCode;*/
		// setCookie('sessionId', testSessionId)
		setCookie('JUId', JUId)
	}
}

const handleSuccess = (data, resolve, showEntireData) => {
	// console.log('handleSuccess', data);
	if (!data || (typeof data) != 'object') {
		uni.showToast({
			title: '系统开小差了~~', icon: 'none'
		})
		return
	}
	if (showEntireData) {
		return resolve(data)
	}
	if (data.code !== '0000') {
		uni.hideLoading()
		return uni.showToast({
			title: data.msg || '网络开小差了~~', icon: 'none'
		})
	} else {
		return resolve(data.data)
	}
}

/**
 * 发送请求工具方法
 */
const send = (options, showEntireData = false) => {
	if (typeof options !== 'object') {
		return
	}
	options = {
		...{
			url: '',
			method: 'POST',
			'content-type': options.data
				? options.data.ContentType || 'application/json'
				: 'application/json',
			data: {},
			header: {},
		},
		...options,
	}
	if (options.data) delete options.data.ContentType
	options.method = options.method.toUpperCase()
	//发送前拦截器
	// #ifdef H5
	beforeSend(options)
	// #endif
	//发送请求
	return new Promise((resolve, reject) => {
		uni.request({
			url: options.url,
			method: options.method,
			data: { ...options.data },
			header: {
				'content-type': options['content-type'],
				...options.header,
				'Scope-Flag': 'user'
			},
			success: (res) => {
				handleSuccess(res.data, resolve, showEntireData)
			},
			fail: (err) => {
				reject(err)
			},
			complete: (data) => { },
		})
	})
}

export { send }
