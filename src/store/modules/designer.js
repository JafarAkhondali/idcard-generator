const state = {
  csvData: [],
  pageSize: '',
};

const getters = {
  csvHeader: (state) => state.csvData[0],
};

const mutations = {
  SET_CSV_ARRAY(state, csvArray) {
    state.csvData = csvArray;
  },
  SET_PAGE_SIZE(state, pageSizeClass) {
    // This are bad practices, i know :|
    const bodyDom = document.querySelector('body');
    const printStyle = document.querySelector('#printMedia');
    state.pageSize.split('.').forEach((oldClass) => {
      if (bodyDom.classList.contains(oldClass)) bodyDom.classList.remove(oldClass);
    });
    const className = pageSizeClass.replace('.', ' ');
    bodyDom.className += className;
    printStyle.innerHTML = `@page { size: ${className} }`;
    state.pageSize = pageSizeClass;
  },
};

const actions = {
  setCsvArray({ commit }, csvArray) {
    commit('SET_CSV_ARRAY', csvArray);
  },
  setPageSize({ commit }, pageSizeClass) {
    commit('SET_PAGE_SIZE', pageSizeClass);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
