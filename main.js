import Vue from 'vue';
import App from './App';

// import { ajax } from './common/ajax.js';
import store from './store/index.js';
import api from './api/index.js';

import vMask from './components/mask.vue';
import vModal from './components/modal.vue';
Vue.component('vMask', vMask);
Vue.component('vModal', vModal);

// Vue.mixin({
//     data() {
//         return {
//             METHOD
//         };
//     }
// });

// Vue.prototype.$ajax = ajax;
Vue.prototype.$request = api;
Vue.prototype.$store = store;

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
