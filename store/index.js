import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '../common/ajax.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        code: '',
        hasLogin: false,
        hasRegister: false,
        userInfo: null,
        houseTempImg: [],
        houseImg: []
    },
    mutations: {
        setCode(state, code) {
            state.code = code
        },
        setLogin(state, bl) {
            state.hasLogin = bl
        },
        setRegister(state, bl) {
            state.hasRegister = bl
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        setHouseTempImg(state, arr) {
            state.houseTempImg = arr
        },
        setHouseImg(state, arr) {
            state.houseImg = arr
        }
    },
    actions: {
        login(context) {
            return new Promise((resolve, reject) => {
                if (context.state.code) {
                    resolve(context.state.code)
                } else {
                    uni.login({
                        success(res) {
                            context.commit('setCode', res.code)
                            resolve(res.code)
                        }
                    })
                }
            })
        },
        getToken(context, data = {}) {
            return ajax('/api/user/checkLogin', data, { noToken: true }).then(res => {
                if (res && res.data && res.data.userinfo) {
                    uni.setStorageSync('tk', res.data.userinfo.token)
                    context.commit('setUserInfo', res.data.userinfo)
                }
                return res
            })
        },
        getInfo(context, noCache = false) {
            if (!noCache && context.state.userInfo) {
                return Promise.resolve({
                    data: context.state.userInfo
                })
            }
            return ajax('/api/user/getRegisterInfo', {}).then(res => {
                if (res && res.data) {
                    uni.setStorageSync('tk', res.data.token)
                    context.commit('setUserInfo', res.data)
                }
                return res
            })
        }
    }
})

export default store
