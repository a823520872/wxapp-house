import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index.js';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        logined: false,
        userInfo: null,
        initFn: null
    },
    mutations: {
        setLogin(state, bl) {
            state.logined = bl
        },
        setInitFn(state, fn) {
            state.initFn = fn
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    actions: {
        login(context) {
            return new Promise((resolve, reject) => {
                let token = uni.getStorageSync('tk')
                if (token) {
                    resolve(token)
                } else {
                    uni.login({
                        success(res) {
                            const {
                                code
                            } = res
                            api
                                .wxLogin({
                                    code
                                })
                                .then(res => {
                                    token = res.data.token
                                    context.commit('setLogin', true)
                                    uni.setStorageSync('tk', token)
                                    resolve(token)
                                }).catch(e => {
                                    uni.removeStorageSync('tk')
                                    reject(e)
                                });
                        },
                        fail(e) {
                            const pages = getCurrentPages()
                            const page = pages[pages.length - 1]
                            setTimeout(() => {
                                uni.reLaunch({
                                    url: `/${page.route}`
                                })
                            }, 2000)
                            uni.showToast({
                            	title: '登录失败',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    });
                }
            })
        },
        goPage(context, value) {
            if (typeof value === 'string') {
                uni.navigateTo({
                    url: value
                });
            } else if (value.replace) {
                uni.redirectTo({
                    url: value.path
                })
            } else {
                uni.navigateTo({
                    url: value.path
                });
            }
        }
    }
})

export default store
