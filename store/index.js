import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        code: '',
        hasLogin: false,
        hasRegister: false,
        userInfo: null,
        houseTempImg: [],
        houseImg: [],
        homeReload: false,
        collectReload: false,
        // #ifdef MP-WEIXIN
        urlPrefix: 'https://house.zhiqiang.ink',
        // #endif
        // #ifdef H5
        urlPrefix: 'http://127.0.0.1:8081'
        // #endif
    },
    mutations: {
        setVal(state, obj) {
            state[obj.key] = obj.val
        },
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
        },
        setHomeReload(state, bl) {
            state.homeReload = bl
        },
        setCollectReload(state, bl) {
            state.collectReload = bl
        },
		setUrlPrefix(state) {
			state.urlPrefix = state.urlPrefix === 'https://house.zhiqiang.ink' ? 'https://house.ioupian.com' : 'https://house.zhiqiang.ink'
		}
    },
    actions: {
        login(context, bl) {
            return new Promise((resolve, reject) => {
                if (bl) {
                    uni.login({
                        success(res) {
                            context.commit('setCode', res.code)
                            resolve(res.code)
                        }
                    })
                } else {
                    uni.checkSession({
                        success() {
                            resolve(context.state.code)
                        },
                        fail() {
                            uni.login({
                                success(res) {
                                    context.commit('setCode', res.code)
                                    resolve(res.code)
                                }
                            })
                        }
                    })
                }
            })
        },
        getToken(context, data = {}) {
            return api.getToken(data).then(res => {
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
            return api.getInfo().then(res => {
                if (res && res.data) {
                    uni.setStorageSync('tk', res.data.token)
                    context.commit('setUserInfo', res.data)
                }
                return res
            })
        },
        checkAuth(context, flag) {
            const auth = uni.getStorageSync('auth')
            const exp = new Date(auth).valueOf()
            const now = new Date().valueOf()
            const hasAuth = now < exp
            if (!flag && hasAuth) {
                return Promise.resolve(auth)
            }
            return api.checkAuth().then(res => {
                uni.setStorageSync('auth', res.data)
                return res.data
            })
        }
    }
})

export default store
