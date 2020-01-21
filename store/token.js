import { TOKEN_GET, TOKEN_SET } from './constant_types';

export const state = () => ({
  ACCESS_TOKEN: '',
});

export const getters = {
  [TOKEN_GET.defines]: (state) => state.ACCESS_TOKEN,
};

export const actions = {};

export const mutations = {
  [TOKEN_SET.defines](state, payload) {
    state = Object.assign(state, payload);
  },
};
