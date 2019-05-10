const state = {
    csvData: []
};

const mutations = {
    SET_CSV_ARRAY(state, csvArray) {
        state.csvData = csvArray;
    }
};

const actions = {
    setCsvArray({ commit }, csvArray){
        commit('SET_CSV_ARRAY', csvArray);
    }
};

export default {
    state,
    mutations,
    actions
}
