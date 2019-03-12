export default {
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
            uni.navigateTo({
                url: value
            })
        } else if (value.replace) {
            uni.redirectTo({
                url: value.path
            })
        } else {
            uni.navigateTo({
                url: value.path
            })
        }
    }
}
