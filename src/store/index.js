import { createStore } from 'vuex';
import getters from './getters';
import mutations from "./mutations";
import actions from './actions';

const state = {
  user: {
    isLogin: window.localStorage.getItem("token") ? true : false,
  }
}

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
  }
});
