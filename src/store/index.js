import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 初始化弹窗隐藏
        isShowModal: false
    },
    mutations: {
        HIDE_MODAL (state) {
            state.isShowModal = false;
        },
        SHOW_MODAL (state) {
            state.isShowModal = true;
        }
    },
    actions: {
        hideModal ({commit}) {
            commit('HIDE_MODAL');
        },
        showModal ({commit}) {
            commit('SHOW_MODAL');
        }
    },
    getters: {
        isShowModal: state => {
            return state.isShowModal;
        }
    }
});

export default store;
