import Vue from 'vue'
import App from './App'

import store from './store/index.js'
import api from './api/index.js'
import util from './common/utils.js'
import config from './common/config.js'
import validator from './common/validator.js'
import filter from './common/filter.js'

import vMask from './components/mask.vue'
import vModal from './components/modal.vue'
import vPage from './components/page.vue'
import vAuth from './components/auth.vue'
Vue.component('vMask', vMask)
Vue.component('vModal', vModal)
Vue.component('vAuth', vAuth)
Vue.component('vPage', vPage)

Vue.mixin({
    data() {
        return {
            CONFIG: config,
        }
    },
    methods: util,
    filters: {
        ...filter,
    },
})

Vue.prototype.$request = api
Vue.prototype.$store = store
Vue.prototype.$validate = validator

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
})
app.$mount()
