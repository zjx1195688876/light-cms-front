import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isShowModal: false, // 初始化弹窗隐藏
        src: '',
        username: '使用者'
    },
    mutations: {
        HIDE_MODAL (state) {
            state.isShowModal = false;
        },
        SHOW_MODAL (state, src) {
            state.isShowModal = true;
            state.src = src;
        },
        SET_USERNAME (state, username) {
            state.username = username;
        }
    },
    actions: {
        hideModal ({commit}) {
            commit('HIDE_MODAL');
        },
        showModal ({commit}, src = '') {
            commit('SHOW_MODAL', src);
        },
        setUserName ({commit}, username = '使用者') {
            commit('SET_USERNAME', username);
        }
    },
    getters: {
        isShowModal: state => {
            return state.isShowModal;
        },
        src: state => {
            return state.src;
        },
        username: state => {
            return state.username;
        }
    }
});

export default store;
