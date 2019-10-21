import {
  COMPANY_CODE_GET,
  COMPANY_CODE_SET,
  COMPANY_CODE_OFF,
  COMPANY_CODE_ON,
} from './constant_types';

export const state = () => ({
  status: false,
  company: null,
});

export const getters = {
  [COMPANY_CODE_GET.defines]: (state) => state,
};

export const actions = {
  [COMPANY_CODE_OFF.defines]: ({ commit }, payload) => {
    commit(COMPANY_CODE_SET.defines, { status: false });
  },
  [COMPANY_CODE_ON.defines]: ({ commit }) => {
    commit(COMPANY_CODE_SET.defines, { status: true });
  },
};

export const mutations = {
  [COMPANY_CODE_SET.defines](state, payload) {
    state = Object.assign(state, payload);
  },
};
