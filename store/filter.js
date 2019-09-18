import { FILTER_GET, FILTER_SET } from './constant_types';

export const state = () => ({
  filters: [],
});

export const getters = {
  [FILTER_GET.defines]: (state) => state,
};

export const actions = {};

export const mutations = {
  [FILTER_SET.defines](state, payload) {
    state = Object.assign(state, payload);
  },
};
