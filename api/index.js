import ajax from '../common/ajax.js';
import store from '../store/index.js';

export default {
    login() {
        return new Promise((resolve, reject) => {
            uni.login({
                success(res) {
                    store.commit('setCode', res.code);
                    resolve(res.code);
                }
            });
        });
    },
    getToken(data = {}) {
        return ajax('/api/user/checkLogin', data, { noToken: true });
    },
    bindMobile(data = {}) {
        return ajax('/api/user/decryptData', data, { type: 'post' });
    },
    getQiniuToken(data = {}) {
        return ajax('/api/upload/getUploadToken', data, { noToken: true, noAlert: true });
    },
    signUp(data = {}) {
        return ajax('/api/user/wxappRegister', data, { type: 'post' });
    },
    getUserInfo(data = {}) {
        return ajax('/api/user/getRegisterInfo', data);
    },
    getAddrList(data = { pid: 0 }) {
        return ajax('/api/area/getList', data, { noToken: true });
    },
    getHouseList(data = {}) {
        return ajax('/api/house_resource/getList', data, { noToken: true });
    },
    addHouse(data = {}) {
        return ajax('/api/house_resource/wxappAdd', data, { type: 'post' });
    },
    editHouse(data = {}) {
        return ajax('/api/house_resource/wxappEdit', data, { type: 'post' });
    },
    getHouse(data = {}) {
        return ajax('/api/house_resource/getDetail', data, { noToken: true });
    },
    getLandlordList(data = {}) {
        return ajax('/api/landlord/getList', data, { noToken: true });
    },
    getLandlordDetail(data = {}) {
        return ajax('/api/landlord/getDetail', data, { noToken: true });
    },
    addLandlord(data = {}) {
        return ajax('/api/landlord/wxappAdd', data);
    },
    editLoandlord(data = {}) {
        return ajax('/api/landlord/edit', data, { type: 'post' });
    },
    collect(data = {}) {
        return ajax('/api/user/collectionAdd', data, { type: 'post' });
    },
    getMyCollection(data = {}) {
        return ajax('/api/user/collectionAdd', data);
    },
    getMyHouse(data = {}) {
        return ajax('/api/user/houseResourceGetlist', data);
    },
    getConfig(data = {}) {
        return ajax('/api/keyvalue/getAllList', data, { noToken: true });
    },
    uploadImg(data = {}) {
        return ajax('/api/upload/add', data, { type: 'post', upload: true, noToken: true });
    }
};
