import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        hasLogin: false,
        hasRegister: false,
        userInfo: null,
        houseTempImg: []
    },
    mutations: {
        setLogin(state, bl) {
            state.hasLogin = bl
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        setHouseTempImg(state, arr) {
            state.houseTempImg = arr
        }
    },

    actions: {
        goPage(context, value) {
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
})

export default store
