import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loading: true
	},
	getters: {
		
	},
	mutations: {
		setLoading(state, bl) {
			state.loading = bl
		}
	},
	actions: {
		
	}
})

export default store