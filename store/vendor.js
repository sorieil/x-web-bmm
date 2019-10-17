import { VENDOR_GET, VENDOR_SET } from './constant_types';

export const state = () => ({
  vendors: [],
  selectedFilters: null,
  selectedFilterItems: null,
  selectFormStatus: null,
});

export const getters = {
  [VENDOR_GET.defines]: (state) => state,
};

export const actions = {};

export const mutations = {
  [VENDOR_SET.defines](state, payload) {
    state = Object.assign(state, payload);
  },
};
