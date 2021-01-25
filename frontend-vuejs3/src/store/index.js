import { createStore } from 'vuex'

export default createStore({
  state: {
    userId: 0, 
    isAdmin: false
  },
  mutations: {
    GET_USER_ID(state, payload) {
      state.userId = payload ; 
    }, 
    GET_USER_ROLE(state, payload) {
      state.userRole = payload === 1 ? true : false ; 
    }
  },
  actions: {
    get_user_data(context, userId, userRole) {
      context.commit('GET_USER_ID', userId); 
      context.commit('GET_USER_ROLE', userRole); 
    }
  },
  modules: {
  }
})
