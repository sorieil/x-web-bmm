import {
  MODAL_FULL_GET,
  MODAL_FULL_SET,
  MODAL_FULL_ACTION_ON,
  MODAL_FULL_ACTION_OFF,
} from './constant_types';

export const state = () => ({
  status: false,
  component: '',
});

export const getters = {
  [MODAL_FULL_GET.defines]: (state) => state,
};

export const actions = {
  [MODAL_FULL_ACTION_ON.defines]: ({ commit }, payload) => {
    // if (!payload.hasProperty('component')) {
    //   console.log('Does not defines property component')
    // , component: payload.component
    // }
    commit(MODAL_FULL_SET.defines, { status: true });
  },
  [MODAL_FULL_ACTION_OFF.defines]: ({ commit }) => {
    commit(MODAL_FULL_SET.defines, { status: false });
  },
};

export const mutations = {
  [MODAL_FULL_SET.defines](state, payload) {
    state = Object.assign(state, payload);
  },
};

// 필터의 모달을 스토어에 저장해서 리스트 뷰에서 띄어줘야 한다.
