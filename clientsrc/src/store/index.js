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
    },
    setNotes(state, notes) {
      state.notes = notes
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
      api.post('bugs', bugData).then(res => {
        router.push({ name: "BugDetails", params: { bugId: res.data._id } });
      })

    },
    /* async deleteBug({ commit, dispatch }, payload) {
       try {
         let data = await api.put('bugs/' + payload.bugId, payload).then(serverList => {
           dispatch('getById', payload.bugId)
         })
         // commit("setActiveBug", data)
       } catch (error) {
         console.error(error)
         alert("You can't delete another user's bug report.")
       }
     },*/
    async addNote({ commit, dispatch }, noteData) {
      api.post('notes', noteData).then(serverList => {
        dispatch('getNotesByBugId', noteData.bugId)
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
    async getNotes({ commit }) {
      try {
        let res = await api.get("notes")
        commit("setNotes", res.data)
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
    async editBug({ commit, dispatch }, bugData) {
      try {
        let res = await api.put('bugs/' + bugData.id, bugData).then(res => {
          dispatch('getById', bugData.id)
        })
        commit("setBugs")
      } catch (error) {
        console.error(error)
        alert("You may not edit another person's bug report.")
      }
    },

    deleteNotesByBugId({ commit, dispatch }, bugId) {
      api.delete('bugs/' + bugId + '/notes')
        .then(serverList => {
          dispatch('getAllNotes')
        })
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
