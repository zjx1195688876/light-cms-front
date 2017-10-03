import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 初始化弹窗隐藏
        isShowModal: false,
        // 当前选中的模板
        tplId: 0
    },
    mutations: {
        HIDE_MODAL (state) {
            state.isShowModal = false;
        },
        SHOW_MODAL (state, tplId) {
            state.isShowModal = true;
            state.tplId = tplId;
        }
    },
    actions: {
        hideModal ({commit}) {
            commit('HIDE_MODAL');
        },
        showModal ({commit}, tplId) {
            commit('SHOW_MODAL', tplId);
        }
    },
    getters: {
        isShowModal: state => {
            return state.isShowModal;
        },
        getTplId: state => {
            return state.tplId;
        }
    }
});

export default store;
