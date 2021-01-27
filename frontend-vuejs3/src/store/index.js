import { createStore } from 'vuex'

export default createStore({
  state: {
    userId: 0, 
    isAdmin: false, 
    token: ''
  },
  mutations: {
    GET_USER_ID(state, payload) {
      state.userId = payload ; 
    }, 
    GET_USER_ROLE(state, payload) {
      if (payload) {
        state.isAdmin = true
      } else {
        state.isAdmin = false
      }
    }, 
    GET_USER_TOKEN(state, payload) {
      state.token = payload; 
    }
  },
  actions: {
    get_user_id(context, userId) {
      context.commit('GET_USER_ID', userId); 
    }, 
    get_user_role(context, userRole) {
      context.commit('GET_USER_ROLE', userRole)
    }, 
    get_user_token(context, token) {
      context.commit('GET_USER_TOKEN', token)
    }
  },
  modules: {
  }
})
