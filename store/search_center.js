import {
  SEARCH_CENTER_GET,
  SEARCH_CENTER_SET,
  SEARCH_CENTER_OFF,
  SEARCH_CENTER_ON,
} from './constant_types';

export const state = () => ({
  status: false,
  returnValue: null,
  companyTypes: [
    '정부기관',
    '전시컨벤션센터',
    '전시주최자',
    '디자인설치업체',
    '서비스업체',
    '미디어',
    '연구기관',
    '컨벤션주최자',
  ],
});

export const getters = {
  [SEARCH_CENTER_GET.defines]: (state) => state,
};

export const actions = {
  [SEARCH_CENTER_OFF.defines]: ({ commit }, payload) => {
    if (payload) {
      commit(SEARCH_CENTER_SET.defines, {
        returnValue: payload,
        status: false,
      });
    } else {
      commit(SEARCH_CENTER_SET.defines, { returnValue: null, status: false });
    }
  },
  [SEARCH_CENTER_ON.defines]: ({ commit }) => {
    commit(SEARCH_CENTER_SET.defines, { status: true });
  },
};

export const mutations = {
  [SEARCH_CENTER_SET.defines](state, payload) {
    state = Object.assign(state, payload);
  },
};
