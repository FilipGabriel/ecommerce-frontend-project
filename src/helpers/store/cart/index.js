export default {
    namespaced: true,
    state: {
        cart: [],
    },
    getters: {
        cart: state => state.cart,
        totalCartQuantity: state => {
            return state.cart.reduce((total, item) => total + item.qty, 0);
        }
    },
    mutations: {
        ADD_CART_ITEM(state, item) {
            const existingItem = state.cart.find(product => product.id === item.id);
            if (existingItem) {
                existingItem.qty += item.qty;
            } else {
                state.cart.push(item);
            }

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        REMOVE_CART_ITEM(state, itemId) {
            state.cart = state.cart.filter(item => item.id !== itemId);
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        SET_CART(state, cart) {
            state.cart = cart
        }
    },
    actions: {
        addCartItem({ commit }, item) {
            commit('ADD_CART_ITEM', item)
        },
        removeCartItem({ commit }, itemId) {
            commit('REMOVE_CART_ITEM', itemId)
        },
        syncLocalStorage({ commit }) {
            if(localStorage.getItem('cart')) {
                commit('SET_CART', JSON.parse(localStorage.getItem('cart')))
            }
        },
    },
}
