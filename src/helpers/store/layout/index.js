export default {
    namespaced: true,
    state: {
        loading: 'global',
        modalOpen: false
    },
    getters: {
        loading: state => state.loading,
        modalOpen: state => state.modalOpen,
    },
    mutations: {
        SET_LOADING(state, loading) {
            state.loading = loading
        },
        SET_MODAL_OPEN(state) {
            state.modalOpen = !state.modalOpen
        },
    },
    actions: {
        setLoading({ commit }, loading) {
            commit('SET_LOADING', loading)
        },
        setModalOpen({ commit }) {
            commit('SET_MODAL_OPEN')
        },
    },
}
