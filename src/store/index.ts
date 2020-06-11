import Vue from 'vue'
import Vuex, { GetterTree, ActionTree, MutationTree } from 'vuex'
import { MainState } from '@/interface/state'
import * as types from './mutation-types';
import {http} from '@/until/axios'
Vue.use(Vuex)
const state: MainState = {
  rankMenu: {name:'xz'},
}
const mutations: MutationTree<any> = {
  [types.SET_CATEGORY](state: MainState, rankMenu: object) {
    state.rankMenu = rankMenu;
  },
}
const actions: ActionTree<any, any> = {
  async getHome({commit},data){
   const request:any = await http.get('companies',{params:data}).then((res:any)=>res)
   commit(types.SET_CATEGORY, request.list)
  }
}
const getters: GetterTree<any, any> = {
  rankMenu(state: MainState): object {
    return state.rankMenu;
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
