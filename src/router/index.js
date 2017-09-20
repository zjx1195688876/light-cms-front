import Vue from 'vue';
import Router from 'vue-router';
import Index from 'pro/views/Index';
import PageManage from 'pro/views/PageManage';
import Login from 'pro/views/Login';
import Preview from 'pro/views/Preview';
import Edit from 'pro/views/Edit';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/pageManage',
        name: 'pageManage',
        component: PageManage
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/preview/:id?type=tpl',
        name: 'preview',
        component: Preview
    },
    {
        path: '/edit/:id?type=page',
        name: 'edit',
        component: Edit
    }
];

export default new Router({
    mode: 'history',
    routes
});
