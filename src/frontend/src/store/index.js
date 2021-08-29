import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);

const state = () => ({});

const actions = {
  async init({ dispatch }) {
    dispatch("builder/setPrice");
  },
};

export default new Vuex.Store({
  state,
  // getters: {},
  // mutations: {},
  actions,
  modules,
});
