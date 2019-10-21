import { FIELD_GET, FIELD_SET } from './constant_types';

export const state = () => ({
  formBusinessVendor: {}, // 요기에 서버에 보낼 정보를 담는다.
});

export const getters = {
  [FIELD_GET.defines]: (state) => state,
};

export const actions = {};

export const mutations = {
  [FIELD_SET.defines](state, payload) {
    state = Object.assign(state, payload);
  },
};
