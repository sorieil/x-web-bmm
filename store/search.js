import {
  SEARCH_GET,
  SEARCH_SET,
  SEARCH_LEFT_OFF,
  SEARCH_LEFT_ON,
} from './constant_types';

export const state = () => ({
  status: false,
  returnValue: null,
});

export const getters = {
  [SEARCH_GET.defines]: (state) => state,
};

export const actions = {
  [SEARCH_LEFT_OFF.defines]: ({ commit }, payload) => {
    if (payload) {
      commit(SEARCH_SET.defines, { returnValue: payload, status: false });
    } else {
      commit(SEARCH_SET.defines, { returnValue: null, status: false });
    }
  },
  [SEARCH_LEFT_ON.defines]: ({ commit }) => {
    commit(SEARCH_SET.defines, { status: true });
  },
};

export const mutations = {
  [SEARCH_SET.defines](state, payload) {
    state = Object.assign(state, payload);
  },
};
