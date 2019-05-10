const state = {
    csvData: []
};

const getters = {
    'csvHeader': state => state.csvData[0]
}
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
    actions,
    getters
}
