export default {
    parse_url(url) {
        var pattern = /([\w_]+)=([\w\/@]+)/gi
        var parames = {}
        url.replace(pattern, (a, b, c) => {
            parames[b] = c
        })
        return parames
    },
    testWechat(v) {
        return /^[a-zA-Z\d_-]{5,}$/.test(v)
    },
    testMobile(v) {
        return /^1[0-9]{10}$/.test(v)
    },
    getTime(t) {
        const time = new Date(t * 1000)
        const y = time.getFullYear()
        const m = this.addZero(time.getMonth() + 1)
        const d = this.addZero(time.getDate())
        const h = this.addZero(time.getHours())
        const min = this.addZero(time.getMinutes())
        // const s = this.addZero(time.getSeconds());
        return `${y}-${m}-${d} ${h}:${min}`
    },
    addZero(v) {
        v = '' + v
        if (!v.charAt(1)) {
            v = '0' + v
        }
        return v
    },
    filterHouse(item, type) {
        item.config_base = type === 'string' ? item.config_base && item.config_base.replace(/\,/g, '，') : item.config_base.split(',')
        item.config_lightspot = type === 'string' ? item.config_lightspot && item.config_lightspot.replace(/\,/g, '，') : item.config_lightspot.split(',')
        item.image_urls = item.image_urls && item.image_urls.split(',')
        return item
    },
    call(v) {
        uni.makePhoneCall({
            phoneNumber: v
        })
    },
    copy(v) {
        uni.setClipboardData({
            data: v,
            success() {
                uni.showToast({
                    title: '复制成功',
                    icon: 'success'
                })
            }
        })
    },
    goPage(value) {
        if (typeof value === 'string') {
            const tabs = ['/pages/index/index', '/pages/publish/index', '/pages/me/index']
            const isHome = tabs.some(tab => {
                return value.indexOf(tab) !== -1
            })
            if (isHome) {
                uni.reLaunch({
                    url: value
                })
            } else {
                uni.navigateTo({
                    url: value
                })
            }
        } else if (typeof value === 'object') {
            if (value.replace) {
                uni.redirectTo({
                    url: value.path
                })
            } else {
                uni.navigateTo({
                    url: value.path
                })
            }
        }
    },
    chooseImage(count = 9) {
        return new Promise((resolve, reject) => {
            uni.chooseImage({
                sizeType: ['compressed'],
                sourceType: 'album',
                count: count,
                success: resolve,
                fail: reject
            })
        })
    }
    // compressImage(src) {
    //     return src.map(item => this._compressImage(item));
    // },
    // _compressImage(src) {
    //     return new Promise((resolve, reject) => {
    //         wx.compressImage({
    //             src, // 图片路径
    //             // quality: 80, // 压缩质量
    //             success(e) {
    //                 console.log(e);
    //                 resolve(e.tempFilePath);
    //             },
    //             fail: reject
    //         });
    //     });
    // }
}
