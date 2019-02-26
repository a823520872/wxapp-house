import store from '../store/index.js';

const ajax = async (path, data, options = {}) => {
    let token = uni.getStorageSync('tk')
    if (!options.noToken && !token) {
        try {
            token = await store.dispatch('login');
        } catch (e) {
            return Promise.reject(e)
        }
    }
    const urlPrefix = 'http://127.0.0.1:7001';
    url = urlPrefix + path;
    options.type = options.type || 'get';
    options.type = options.type.toUpperCase();
    options.loading &&
        uni.showLoading({
            title: '加载中……',
            mask: options.mask
        });

    function request() {
        return new Promise((resolve, reject) => {
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
                success(res) {
                    console.log(res.data);
                    options.loading && uni.hideLoading();
                    resolve(res.data);
                },
                fail(e) {
                    console.log(e);
                    options.loading && uni.hideLoading();
                    reject(e);
                    if (e && e.errMsg === 'request:fail abort') return;
                    !options.noAlert && uni.showToast({
                        title: '网络异常',
                        icon: 'none'
                    })
                }
            };
            const requestTask = uni.request(obj);
        });
    }

    return request
};

export default ajax;
