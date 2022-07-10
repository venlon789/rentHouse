import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    cityId: {
      label: '北京',
      value: 'AREA|88cff55c-aaa4-e2e0',
      pinyin: 'beijing',
      short: 'bj'
    },
    area: null,
    houseCode: ''
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    getselsctCityId (state, payload) {
      state.cityId = payload
    },
    getCommunityValue (state, payload) {
      state.area = payload
    },
    gethouseCodeValue (state, payload) {
      state.houseCode = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
