import Vue from 'vue';
import App from './App';

import { ajax } from './common/ajax.js';

import vMask from './component/mask.vue';
import vModal from './component/modal.vue';
Vue.component('vMask', vMask);
Vue.component('vModal', vModal);

// Vue.mixin({
//     data() {
//         return {
//             METHOD
//         };
//     }
// });

Vue.prototype.$ajax = ajax;

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App
});
app.$mount();
