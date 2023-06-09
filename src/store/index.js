import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/auth";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        date: null,
        notifications: [],
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        auth
    }
})
