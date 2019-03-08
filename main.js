import Vue from 'vue'
import App from './App'

import store from './store/index.js'
import api from './api/index.js'

import vMask from './components/mask.vue'
import vModal from './components/modal.vue'
import vPage from './components/page.vue'
Vue.component('vMask', vMask)
Vue.component('vModal', vModal)
Vue.component('vPage', vPage)

Vue.mixin({
    methods: {
        goPage(value) {
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

Vue.prototype.$request = api
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
