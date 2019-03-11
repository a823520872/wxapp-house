export default {
    testWechat(v) {
        return /^[a-zA-Z\d_-]{5,}$/.test(v);
    },
    testMobile (v) {
        return /^1[0-9]{10}$/.test(v);
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
};
