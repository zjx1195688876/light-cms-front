import Vue from 'vue';
import Router from 'vue-router';
import Index from 'pro/views/Index';
import PageManage from 'pro/views/PageManage';
import Login from 'pro/views/Login';
import Preview from 'pro/views/Preview';
import Edit from 'pro/views/Edit';
import NotFound from 'pro/views/NotFound';
import _ from 'pro/lib/util';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/chooseTpl',
        name: 'chooseTpl',
        component: Index,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/pageManage',
        name: 'pageManage',
        component: PageManage,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/preview',
        name: 'preview',
        component: Preview,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: Edit,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/add',
        name: 'add',
        component: Edit,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '*',
        name: 'notFound',
        component: NotFound
    }
];

let router = new Router({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (_.$getCookie('userFront')) {
            next();
        } else {
	    next({
	        path: '/login'
	    });
        }
    } else {
        next();
    }
});

export default router;
