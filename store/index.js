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
    }
})

export default store
