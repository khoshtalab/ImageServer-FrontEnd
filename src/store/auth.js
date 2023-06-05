import axios from "axios";

export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        user_plan: null

    },
    getters: {
        authenticated(state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        },
        user_plan(state) {
            return state.user_plan
        },
        verified(state) {
            return state.token && state.user && state.user.emailVerified
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USER(state, data) {
            state.user = data.user
            state.user_plan = data.customerSub

        }
    },
    actions: {
        async login({dispatch}, credentials) {
            let response = await axios.post('auth/login', credentials)
            dispatch('attempt', response.data.token)
            return response
            //return response
        },
        async attempt({commit, state}, token) {
            if (token)
                commit('SET_TOKEN', token)
            if (!state.token)
                return
            console.log(token)
            try {

                let response = await axios.get('cp', null)
                commit('SET_USER', response.data)

            } catch (e) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        },

        logout({commit}) {

            commit('SET_TOKEN', null)
            commit('SET_USER', null)
        },

        async register(/*{commit}*/_, credentials) {
            let response = await axios.post('auth/signup', credentials)
            return response
            //console.log(response.data)
            // let status = response.data.status
            // if (status === "success") {
            //     commit('SET_TOKEN', response.data.access_token)
            // }

        }
    },
}
