const ajax = (url, data, options = {}) => {
    const urlPrefix = 'http://127.0.0.1:7001';
    url = urlPrefix + url;
    options.type = options.type || 'get';
    options.type = options.type.toUpperCase();
    options.loading &&
        uni.showLoading({
            title: '加载中……',
            mask: options.mask
        });

    return new Promise((resolve, reject) => {
        let obj = {
            url,
            method: options.type,
            data,
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log(res);
                options.loading && uni.hideLoading();
                resolve(res);
            },
            fail(e) {
                console.log(e);
                options.loading && uni.hideLoading();
                reject(e);
            }
        };
        const requestTask = uni.request(obj);
    });
};

export { ajax };
