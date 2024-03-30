import Vue from 'vue'
import Vuex from 'vuex'
import request from "axios";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    interfaceImgUrl:'http://182.92.7.24:9090/api/interface/',
    userImgUrl:'http://182.92.7.24:9090/api/user/',
    blogImgUrl:'http://182.92.7.24:9090/api/blog/',
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
