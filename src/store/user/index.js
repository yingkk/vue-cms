export default {
  namespaced: true,
  state: {
    datas: [],
  },
  mutations: {
    SET_DATAS(state, payload) {
      state.datas = payload;
    },
  },
  actions: {
    async _getUserById({ rootState }, payload) {
      return await rootState.axios.get(rootState.api.GET_USER_BY_ID + payload);
    },
    async _updateUser({ rootState }, payload) {
      return await rootState.axios.post(rootState.api.UPDATE_USER, payload);
    },
    async _addUser({ rootState }, payload) {
      return await rootState.axios.post(rootState.api.ADD_USER, payload);
    },
    async _searchUser({ rootState }, params) {
      return await rootState.axios.get(rootState.api.SEARCH_USER, {
        params: { ...params, orderBy: "id desc" },
      });
    },
  },
};
