const ajax = (url, data, options) => {
    const urlPrefix = 'http://127.0.0.1:7001';
    url = urlPrefix + url;
    options.type = (options.type || 'get').toUpper();

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
                resolve(res);
            },
            fail(e) {
                console.log(e);
                reject(e);
            }
        };
        const requestTask = uni.request(obj);
    })
};

export { ajax };
