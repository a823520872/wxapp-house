import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        hasLogin: false,
        hasRegister: false,
        userInfo: {
            nickName: '李志强',
            gender: 1,
            language: 'zh_CN',
            city: 'Guangzhou',
            province: 'Guangdong',
            country: 'China',
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo4bPX0EXYk1kBUicgxLib1QRllEK6IicicYP0ibDYxwNB41sReybNicxDfsLLZwEah7XTqkCT3qBQPAwRw/132'
        },
        houseTempImg: []
    },
    mutations: {
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
        }
    }
})

export default store
