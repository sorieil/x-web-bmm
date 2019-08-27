import { PROJECT_GET, PROJECT_SET } from './constant_types'

export const state = () => ({})

export const getters = {
  [PROJECT_GET.defines]: (state) => state
}

export const actions = {}

export const mutations = {
  [PROJECT_SET.defines](state, payload) {
    state = Object.assign(state, payload)
  }
}
