import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);

let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    notes: [],
    activeBug: {},
    activeNotes: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBugs(state, bugs) {
      state.bugs = bugs;
    },
    setActiveBug(state, activeBug) {
      state.activeBug = activeBug
    },
    setActiveNotes(state, activeNotes) {
      state.activeNotes = activeNotes
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async addBug({ commit, dispatch }, bugData) {
      api.post('bugs', bugData).then(serverList => {
        dispatch('getBugs')
      })
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBugs({ commit }) {
      try {
        let res = await api.get("bugs")
        commit("setBugs", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getById({ commit, dispatch }, id) {
      try {
        let res = await api.get('bugs/' + id)
        commit("setActiveBug", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getNotesByBugId({ commit, dispatch }, id) {
      try {
        let res = await api.get('bugs/' + id + '/notes')
        commit("setActiveNotes", res.data)
      } catch (error) {

      }
    }
  }
})
