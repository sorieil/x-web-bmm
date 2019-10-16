import {
  USER_TYPE_GET,
  USER_TYPE_SET,
  USER_TYPE_OFF,
  USER_TYPE_ON,
} from './constant_types';

export const state = () => ({
  status: false,
});

export const getters = {
  [USER_TYPE_GET.defines]: (state) => state,
};

export const actions = {
  [USER_TYPE_OFF.defines]: ({ commit }, payload) => {
    commit(USER_TYPE_SET.defines, { status: false });
  },
  [USER_TYPE_ON.defines]: ({ commit }) => {
    commit(USER_TYPE_SET.defines, { status: true });
  },
};

export const mutations = {
  [USER_TYPE_SET.defines](state, payload) {
    state = Object.assign(state, payload);
  },
};
