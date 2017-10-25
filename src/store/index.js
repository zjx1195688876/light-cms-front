import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 初始化弹窗隐藏
        isShowModal: false,
        src: ''
    },
    mutations: {
        HIDE_MODAL (state) {
            state.isShowModal = false;
        },
        SHOW_MODAL (state, src) {
            state.isShowModal = true;
            state.src = src;
        }
    },
    actions: {
        hideModal ({commit}) {
            commit('HIDE_MODAL');
        },
        showModal ({commit}, src = '') {
            commit('SHOW_MODAL', src);
        }
    },
    getters: {
        isShowModal: state => {
            return state.isShowModal;
        },
        src: state => {
            return state.src;
        }
    }
});

export default store;
