// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App';
import store from './store';
import router from './router';
import 'element-ui/lib/theme-default/index.css';

Vue.config.productionTip = false;// vue扩展
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
