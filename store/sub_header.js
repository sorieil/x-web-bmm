import { SUB_HEADER_GET, SUB_HEADER_SET } from './constant_types';

export const state = () => ({
  subHeaderTitle: null,
});

export const getters = {
  [SUB_HEADER_GET.defines]: (state) => state,
};

export const actions = {};

export const mutations = {
  [SUB_HEADER_SET.defines](state, payload) {
    state = Object.assign(state, payload);
  },
};
