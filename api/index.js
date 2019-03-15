import ajax from '../common/ajax.js'

export default {
    // bindMobile(data = {}) {
    //     return ajax('/api/user/decryptData', data, { type: 'post' })
    // },
    getQiniuToken(data = {}) {
        return ajax('/api/upload/getUploadToken', data, { noToken: true, noAlert: true })
    },
    signUp(data = {}) {
        return ajax('/api/user/wxappRegister', data, { type: 'post' })
    },
    getAddrList(data = {}) {
        return ajax('/api/area/getList', data, { noToken: true })
    },
    getHouseList(data = {}) {
        return ajax('/api/house_resource/getList', data, { noToken: true })
    },
    addHouse(data = {}) {
        return ajax('/api/house_resource/wxappAdd', data, { type: 'post' })
    },
    editHouse(data = {}) {
        return ajax('/api/house_resource/wxappEdit', data, { type: 'post' })
    },
    getHouse(data = {}) {
        return ajax('/api/house_resource/getDetail', data, { noToken: true })
    },
    getLandlordList(data = {}) {
        return ajax('/api/landlord/getList', data, { noToken: true })
    },
    getLandlordDetail(data = {}) {
        return ajax('/api/landlord/getDetail', data, { noToken: true })
    },
    addLandlord(data = {}) {
        return ajax('/api/landlord/wxappAdd', data, { type: 'post' })
    },
    editLoandlord(data = {}) {
        return ajax('/api/landlord/edit', data, { type: 'post' })
    },
    collect(data = {}) {
        return ajax('/api/user/collectionAdd', data, { type: 'post' })
    },
    getMyCollection(data = {}) {
        return ajax('/api/user/collectionGetList', data)
    },
    getMyHouse(data = {}) {
        return ajax('/api/user/houseResourceGetlist', data)
    },
    getConfig(data = {}) {
        return ajax('/api/keyvalue/getAllList', data, { noToken: true })
    },
    uploadImg(data = {}) {
        return ajax('/api/upload/add', data, { type: 'post', upload: true, noToken: true })
    },
    getQRCode(data = {}) {
        return ajax('/api/House_Resource/getPoster', data, { type: 'post' })
    }
}
