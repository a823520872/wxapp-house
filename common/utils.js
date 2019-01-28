export default {
    testWechat: function(v) {
        return /^[a-zA-Z\d_-]{5,}$/.test(v);
    },
    testPhone: function (v) {
        return /^1[0-9]{10}$/.test(v);
    }
};
