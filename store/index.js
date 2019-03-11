import Vue from 'vue';
import Vuex from 'vuex';
import ajax from '../common/ajax.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        code: '',
        hasLogin: false,
        openid: '',
        hasRegister: false,
        userInfo: null,
        houseTempImg: []
    },
    mutations: {
        setCode(state, code) {
            state.code = code;
        },
        setLogin(state, bl) {
            state.hasLogin = bl;
        },
        setOpenId(state, openid) {
            state.openid = openid;
        },
        setRegister(state, bl) {
            state.hasRegister = bl;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setHouseTempImg(state, arr) {
            state.houseTempImg = arr;
        }
    },
    actions: {
        login(context) {
            return new Promise((resolve, reject) => {
                uni.login({
                    success(res) {
                        const { code } = res;
                        ajax('/api/Wxapp/Wxapp/getAuthToken', { code }, { noToken: true, noLogin: true })
                            .then(json => {
                                console.log(json);
                                context.commit('setLogin', true);
                                context.commit('setRegister', json.data.is_member === 1);
                                resolve(json);
                            })
                            .catch(e => {
                                reject(e);
                            });
                    },
                    fail(e) {
                        const pages = getCurrentPages();
                        const page = pages[pages.length - 1];
                        setTimeout(() => {
                            uni.reLaunch({
                                url: `/${page.route}`
                            });
                        }, 2000);
                        uni.showToast({
                            title: '登录失败',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                });
            });
        }
    }
});

export default store;
