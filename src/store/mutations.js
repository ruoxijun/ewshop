const mutations = {
  setIsLogin(state, payload) {
    state.user.isLogin = payload;
  },
  setCartCount(state, payload) {
    state.carts.count = payload;
  }
}

export default mutations;