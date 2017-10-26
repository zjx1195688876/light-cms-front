import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isShowModal: false, // 初始化弹窗隐藏
        src: '',
        isLogin: false // 未登录
    },
    mutations: {
        HIDE_MODAL (state) {
            state.isShowModal = false;
        },
        SHOW_MODAL (state, src) {
            state.isShowModal = true;
            state.src = src;
        },
        SET_LOGIN (state) {
            state.isLogin = true;
        },
        SET_LOGOUT (state) {
            state.isLogin = false;
        }
    },
    actions: {
        hideModal ({commit}) {
            commit('HIDE_MODAL');
        },
        showModal ({commit}, src = '') {
            commit('SHOW_MODAL', src);
        },
        setLogin ({commit}) {
            commit('SET_LOGIN');
        },
        setLogout ({commit}) {
            commit('SET_LOGOUT');
        }
    },
    getters: {
        isShowModal: state => {
            return state.isShowModal;
        },
        src: state => {
            return state.src;
        },
        isLogin: state => {
            return state.isLogin;
        }
    }
});

export default store;
