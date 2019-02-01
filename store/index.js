import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: null,
		initFn: null
	},
	getters: {
		
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
		goPage(context, url) {
			if (!url) return
			uni.navigateTo({url})
		}
	}
})

export default store