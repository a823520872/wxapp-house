import store from '../store/index.js';

const ajax = async (path, data, options = {}) => {
    const urlPrefix = 'https://house.zhiqiang.ink';
    const url = urlPrefix + path;
    const token = uni.getStorageSync('tk');
    options.type = options.type || 'get';
    options.loading &&
        uni.showLoading({
            title: '加载中……',
            mask: options.mask
        });
    if (!options.noToken && !token) {
        setTimeout(() => {
            uni.navigateTo({
                url: '/pages/me/me'
            });
        }, 100);
        uni.showToast({
            title: '请先登录小程序',
            icon: 'none'
        });
        return Promise.reject({
            msg: '未登录'
        });
    }

    const header = {
        'content-type': 'application/json'
    };
    if (!options.noToken) {
        header['token'] = token;
    }
    const success = res => {
        console.log(path, res);
        options.loading && uni.hideLoading();
        if (res.length && res.length === 2) {
            res = res[1];
        }

        if (res && res.statusCode == 200) {
            let data = res.data;
            if (data.code && data.code === 1) {
                if (data.data && data.data.message && data.data.message === '请求Token失败') {
                    uni.showToast({
                        title: '请重新登录',
                        icon: 'none'
                    });
                }
                return Promise.resolve(data);
            } else {
                !options.noAlert && uni.showToast({ title: data.msg, icon: 'none' });
                return Promise.reject(data);
            }
        } else {
            return Promise.reject({ code: res.statusCode, msg: res.errMsg });
        }
    };
    const fail = e => {
        console.log(path, e);
        options.loading && uni.hideLoading();
        return Promise.reject(e);
        if (e && e.errMsg === 'request:fail abort') return;
        !options.noAlert &&
            uni.showToast({
                title: '网络异常',
                icon: 'none'
            });
    };
    const obj = {
        url,
        method: options.type,
        data,
        header
    };

    return uni.request(obj).then(success, fail);
};

export default ajax;
