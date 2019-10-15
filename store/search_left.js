import {
  SEARCH_LEFT_GET,
  SEARCH_LEFT_SET,
  SEARCH_LEFT_OFF,
  SEARCH_LEFT_ON,
} from './constant_types';

export const state = () => ({
  status: false,
  returnValue: null,
  companys: ['피엑스디', '피엑스디 코리아', '테스트'],
});

export const getters = {
  [SEARCH_LEFT_GET.defines]: (state) => state,
};

export const actions = {
  [SEARCH_LEFT_OFF.defines]: ({ commit }, payload) => {
    if (payload) {
      commit(SEARCH_LEFT_SET.defines, { returnValue: payload, status: false });
    } else {
      commit(SEARCH_LEFT_SET.defines, { returnValue: null, status: false });
    }
  },
  [SEARCH_LEFT_ON.defines]: ({ commit }) => {
    commit(SEARCH_LEFT_SET.defines, { status: true });
  },
};

export const mutations = {
  [SEARCH_LEFT_SET.defines](state, payload) {
    state = Object.assign(state, payload);
  },
};
