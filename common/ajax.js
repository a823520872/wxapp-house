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
    if (token) {
        header['token'] = token;
    }
    const success = res => {
        options.loading && uni.hideLoading();
        if (res.length && res.length === 2) {
            res = res[1];
        }
        console.log(path, res.data);

        if (res && res.statusCode == 200) {
            let data = res.data;
            if (data.code && data.code === 1) {
                if (data.data && data.data.message && data.data.message === '请求Token失败') {
                    uni.showToast({
                        title: '登录失败',
                        icon: 'none'
                    });
                }
                return Promise.resolve(data);
            } else {
                !options.noAlert && uni.showToast({ title: data.msg, icon: 'none' });
                return Promise.reject(data);
            }
        } else {
            !options.noAlert && uni.showToast({ title: res.statusCode, icon: 'none' });
            return Promise.reject({ code: res.statusCode, msg: res.errMsg });
        }
    };
    const fail = e => {
        console.log(path, e);
        options.loading && uni.hideLoading();
        !options.noAlert &&
            uni.showToast({
                title: '网络异常',
                icon: 'none'
            });
        if (e && e.errMsg === 'request:fail abort') return;
        return Promise.reject(e);
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
