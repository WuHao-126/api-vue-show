import Vue from 'vue'
import Vuex from 'vuex'
import request from "axios";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    interfaceImgUrl:'http://101.126.87.57:9090/api/interface/',
    userImgUrl:'http://101.126.87.57:9090/api/user/',
    blogImgUrl:'http://101.126.87.57:9090/api/blog/',
    applyCurrent:''
  },
  getters: {

  },
  mutations: {
    updateApplyCurrent(state,data){
      state.applyCurrent=data
    }
  },
  actions: {


  },
  modules: {
  }
})
