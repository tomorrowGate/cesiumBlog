// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store'
import 'cesium/Widgets/widgets.css'
 
let Cesium = require('cesium/Cesium');
Vue.use(Cesium)


Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$axios = axios


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
