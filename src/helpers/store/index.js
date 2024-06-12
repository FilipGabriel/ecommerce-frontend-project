import { createStore } from 'vuex'
import layout from './layout'
import cart from './cart'

const store = createStore({
    modules: {
        layout,
        cart,
    },
})

export default store
