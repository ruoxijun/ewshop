import { getCarts } from '@network/cart'

const actions = {
    setCartCount({ commit }) {
        getCarts().then(res=> {
            commit("setCartCount", res.data.length);
        });
    }
}

export default actions;