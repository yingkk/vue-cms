import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'

import "./sheet/app.scss"

import ElementUI from 'element-ui';
Vue.use(ElementUI);
Vue.mixin(mixins);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
