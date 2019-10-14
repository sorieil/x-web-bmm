import {
  FILTER_GET,
  FILTER_SET,
  FILTER_ACTION_ON,
  FILTER_ACTION_OFF,
} from './constant_types';

export const state = () => ({
  status: false,
  filter: [],
});

export const getters = {
  [FILTER_GET.defines]: (state) => state,
};

export const actions = {
  [FILTER_ACTION_ON.defines]: ({ commit }, payload) => {
    commit(FILTER_SET.defines, { status: true });
  },
  [FILTER_ACTION_OFF.defines]: ({ commit }) => {
    commit(FILTER_SET.defines, { status: false });
  },
};

export const mutations = {
  [FILTER_SET.defines](state, payload) {
    state = Object.assign(state, payload);
  },
};
