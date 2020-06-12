import Vue from 'vue'
import Vuex, { GetterTree, ActionTree, MutationTree } from 'vuex'
import { MainState } from '@/interface/state'
import * as types from './mutation-types';
import { http } from '@/until/axios'
Vue.use(Vuex)
const state: MainState = {
  rankMenu: { name: 'xz' },
  rankMenu1: { rankMenu: 'cs' }
}
const mutations: MutationTree<any> = {
  [types.SET_RANkMenu](state: MainState, rankMenu: object) {
    state.rankMenu = rankMenu;
  },
  [types.SET_MENU](state: MainState,rankMenu1: object ){
    state.rankMenu1 = rankMenu1;
  }
}
const actions: ActionTree<any, any> = {
  async getHome({ dispatch,commit }, data) {
    const request: any = await http.get('companies', { params: data }).then((res: any) => res)
    dispatch('getMenu')
    commit(types.SET_RANkMenu, request.list)
  },
  async getMenu({ commit }) {
    const request: any = await http.get('companies').then((res: any) => res)
    commit(types.SET_MENU, request.list)
  }
}
const getters: GetterTree<any, any> = {
  rankMenu(state: MainState): object {
    return state.rankMenu;
  },
  rankMenu1(state: MainState): object {
    return state.rankMenu1;
  },
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
  }
})
