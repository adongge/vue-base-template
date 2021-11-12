import Vue from 'vue'
import Vuex from 'vuex'
import common from '@/store/modules/common'
import user from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    common,
    user
  }
})
