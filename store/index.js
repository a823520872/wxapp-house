import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loading: true,
		userInfo: null,
	},
	getters: {
		
	},
	mutations: {
		setLoading(state, bl) {
			state.loading = bl
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo
		}
	},
	actions: {
		
	}
})

export default store