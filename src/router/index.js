import Vue from 'vue';
import Router from 'vue-router';
import Index from 'pro/container/Index';
import Login from 'pro/container/Login';
import Preview from 'pro/container/Preview';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/preview/:pageId',
        name: 'preview',
        component: Preview
    }
];

export default new Router({
    mode: 'history',
    routes
});
