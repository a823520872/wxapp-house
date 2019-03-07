import store from '../store/index.js'

const ajax = async (path, data, options = {}) => {
    const urlPrefix = 'https://house.zhiqiang.ink'
    const url = urlPrefix + path
    const hasLogin = store.state.hasLogin
    let token = uni.getStorageSync('tk')
    if (!options.noToken) {
        if (!hasLogin) {
            try {
                token = await store.dispatch('login')
            } catch (e) {
                return Promise.reject(e)
            }
        }
    }
    options.type = options.type || 'get'
    options.type = options.type.toUpperCase()
    options.loading &&
        uni.showLoading({
            title: '加载中……',
            mask: options.mask
        })

    function request() {
        return new Promise((resolve, reject) => {
            const success = res => {
                options.loading && uni.hideLoading()
                console.log(res)

                if (res && res.statusCode == 200) {
                    let data = res.data
                    if (data.code && data.code === 1) {
                        resolve(data)
                    } else {
                        uni.showToast({ title: data.msg, icon: 'none' })
                        reject(data)
                    }
                } else {
                    reject({ code: res.statusCode, msg: res.statusCode })
                }
            }
            const fail = e => {
                options.loading && uni.hideLoading()
                reject(e)
                if (e && e.errMsg === 'request:fail abort') return
                !options.noAlert &&
                    uni.showToast({
                        title: '网络异常',
                        icon: 'none'
                    })
            }
            // if (options.upload) {
            //     let obj = {
            //         url,
            //         files: data.files,
            //         filePath: data.files[0].uri,
            //         name: data.files[0].name,
            //         formData: data.params || {},
            //         success,
            //         fail
            //     }
            //     uni.uploadFile(obj)
            // } else {
            let header = {
                'content-type': 'application/json'
            }
            if (!options.noToken) {
                header['token'] = token
            }
            let obj = {
                url,
                method: options.type,
                data,
                header,
                success,
                fail
            }
            const requestTask = uni.request(obj)
            // }
        })
    }

    return request()
}

export default ajax
