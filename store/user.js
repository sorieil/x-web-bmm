import { USER_GET, USER_SET } from './constant_types';

export const state = () => ({
  type: null,
});

export const getters = {
  [USER_GET.defines]: (state) => state,
};

export const actions = {};

export const mutations = {
  [USER_SET.defines](state, payload) {
    state = Object.assign(state, payload);
  },
};
