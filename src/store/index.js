import Vue from "vue";
import Vuex from "vuex";
import axios from "./axios";
import api from "./api";

const modules = {};
const files = require.context("./", true, /^\.\/(\w*\/)+index\.js$/);
files.keys().forEach((file) => {
  const moduleName = file.replace(/(^\.\/)|(\/index\.js$)/g, "");
  modules[moduleName] = files(file).default || files(file);
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    axios,
    api,
    loginUserInfo: {},
  },
  mutations: {
    SET_LOGIN_USER_INFO(state, payload) {
      state.loginUserInfo = { ...payload };
    },
  },
  actions: {},
  modules: {
    ...modules,
  },
});
