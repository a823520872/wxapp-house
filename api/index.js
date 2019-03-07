import ajax from '../common/ajax.js'

export default {
    getToken(data = {}) {
        return ajax('/api/Wxapp/Wxapp/getAuthToken', data, { noToken: true })
    },
    signUp(data = {}) {
        return ajax('/api/user/wxappRegister', data, { type: 'post' })
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
    getLandlordList(data = {}) {
        return ajax('/api/landlord/getList', data, { noToken: true })
    },
    getLandlordDetail(data = {}) {
        return ajax('/api/landlord/getDetail', data, { noToken: true })
    },
    addLandlord(data = {}) {
        return ajax('/api/landlord/wxappAdd', data)
    },
    editLoandlord(data = {}) {
        return ajax('/api/landlord/edit', data, { type: 'post' })
    },
    getConfig(data = { type: 'config_lightspot' }) {
        return ajax('/api/keyvalue/getAllList', data, { noToken: true })
    },
    uploadImg(data = {}) {
        return ajax('/api/upload/add', data, { type: 'post', upload: true, noToken: true })
    }
}
