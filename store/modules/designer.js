const state = {
    main: 0
};

const mutations = {
    DECREMENT_MAIN_COUNTER(state) {
        state.main = 10;
    }
};

const actions = {
    someAsyncTask ({ commit }) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    }
};

export default {
    state,
    mutations,
    actions
}
