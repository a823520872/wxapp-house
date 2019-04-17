import ajax from '../common/ajax.js';

export default {
    getToken(data = {}) {
        return ajax('/api/user/checkLogin', data, { noToken: true, noAlert: true });
    },
    bindMobile(data = {}) {
        return ajax('/api/user/bindWxappMobile', data, { type: 'post', loading: true });
    },
    viewPhone(data = {}) {
        return ajax('/api/house_resource/getPhoneNumber', data, { type: 'post', noAlert: true, loading: true });
    },
    getInfo(data = {}) {
        return ajax('/api/user/getRegisterInfo', data, { noAlert: true });
    },
    signUp(data = {}) {
        return ajax('/api/user/wxappRegister', data, { type: 'post' });
    },
    checkAuth(data = {}) {
        return ajax('/api/landlord/checkLandlord', data, { type: 'get', noAlert: true });
    },
    getQiniuToken(data = {}) {
        return ajax('/api/upload/getUploadToken', data, { noToken: true, noAlert: true });
    },
    getAddrList(data = { pid: 1969 }) {
        return ajax('/api/area/getAllList', data, { noToken: true }).then(res => {
            if (res.data) {
                return {
                    ...res,
                    data: [
                        [
                            {
                                id: 1965,
                                name: '广州市',
                                first: 'G',
                                pinyin: 'guangzhou',
                                level: 2
                            }
                        ],
                        [
                            {
                                id: 1969,
                                name: '天河区',
                                first: 'T',
                                pinyin: 'tianhe',
                                level: 3
                            }
                        ],
                        [...res.data]
                    ]
                };
            } else {
                return {
                    code: 0,
                    msg: '请求成功',
                    data: [
                        [
                            {
                                id: 1965,
                                name: '广州市',
                                first: 'G',
                                pinyin: 'guangzhou',
                                level: 2
                            }
                        ],
                        [
                            {
                                id: 1969,
                                name: '天河区',
                                first: 'T',
                                pinyin: 'tianhe',
                                level: 3
                            }
                        ],
                        [
                            {
                                id: 3749,
                                name: '上社',
                                first: 'S',
                                level: 4
                            },
                            {
                                id: 3751,
                                name: '棠下',
                                first: 'T',
                                level: 4
                            },
                            {
                                id: 3750,
                                name: '棠东',
                                first: 'T',
                                level: 4
                            }
                        ]
                    ]
                };
            }
        });
    },
    getAreaStreet(data = {}) {
        return ajax('/api/area_street/getAllList', data);
    },
    getAreaFlag(data = {}) {
        return ajax('/api/area_flag/getAllList', data);
    },
    getHouseList(data = {}) {
        return ajax('/api/house_resource/getList', data, { noToken: true });
    },
    addHouse(data = {}) {
        return ajax('/api/house_resource/wxappAdd', data, { type: 'post', loading: true });
    },
    editHouse(data = {}) {
        return ajax('/api/house_resource/wxappEdit', data, { type: 'post', loading: true });
    },
    getHouse(data = {}) {
        return ajax('/api/house_resource/getDetail', data, { noToken: true });
    },
    addReader(data) {
        return ajax('/api/house_resource/readAdd', data, { type: 'post', noAlert: true });
    },
    getLandlordList(data = {}) {
        return ajax('/api/landlord/getList', data, { noToken: true });
    },
    getLandlordDetail(data = {}) {
        return ajax('/api/landlord/getDetail', data, { noToken: true, loading: true });
    },
    sendSms(data = {}) {
        return ajax('/api/landlord/sendSms', data, { type: 'post' });
    },
    sendLoginSms(data = {}) {
        return ajax('/api/Sms/send', data, { type: 'post', noToken: true });
    },
    mobileLogin(data = {}) {
        return ajax('/api/user/mobilelogin', data, { type: 'post', noToken: true, loading: true });
    },
    addLandlord(data = {}) {
        return ajax('/api/landlord/wxappAdd', data, { type: 'post', loading: true });
    },
    editLoandlord(data = {}) {
        return ajax('/api/landlord/edit', data, { type: 'post', loading: true });
    },
    collect(data = {}) {
        return ajax('/api/user/collectionAdd', data, { type: 'post', loading: true });
    },
    cancelCollect(data = {}) {
        return ajax('/api/user/collectionDel', data, { type: 'post', loading: true });
    },
    getMyCollection(data = {}) {
        return ajax('/api/user/collectionGetList', data, { loading: true });
    },
    getMyHouse(data = {}) {
        return ajax('/api/user/houseResourceGetlist', data);
    },
    getUserHouse(data = {}) {
        return ajax('/api/house_resource/getUserList', data, { noToken: true, loading: true });
    },
    rent(data = {}) {
        return ajax('/api/House_resource/rentChange', data, { type: 'post', loading: true });
    },
    public(data = {}) {
        return ajax('/api/House_Resource/publicHouse', data, { type: 'post' });
    },
    getConfig(data = {}) {
        return ajax('/api/keyvalue/getAllList', data, { noToken: true });
    },
    uploadImg(data = {}) {
        return ajax('/api/upload/uploadImage', data, { type: 'post', upload: true, noToken: true });
    },
    getQRCode(data = {}) {
        return ajax('/api/House_Resource/getPoster', data, { type: 'post' });
    }
};
