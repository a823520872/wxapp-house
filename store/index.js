import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index.js';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: null,
		initFn: null
	},
	mutations: {
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
				uni.login({
					success(res) {
						const {
							code
						} = res
						api
							.wxLogin({code})
							.then(resolve).catch(reject);
					},
					fail: reject
				});
			})
		},
		goPage(context, url) {
			if (!url) return
			uni.navigateTo({
				url
			})
		}
	}
})

export default store
